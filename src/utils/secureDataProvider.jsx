import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { validateArtisanData, sanitizeHTML } from '../utils/security';
import ErrorMessage from '../components/ui/ErrorMessage';

/**
 * HOC (Higher Order Component) pour sécuriser les données d'artisans
 */
export function withSecureArtisanData(WrappedComponent) {
  const SecureArtisanDataWrapper = ({ artisansData, ...props }) => {
    // Validation et sanitisation des données
    const { validatedData, errors } = useMemo(() => {
      const validated = [];
      const validationErrors = [];

      if (!Array.isArray(artisansData)) {
        return {
          validatedData: [],
          errors: ['Les données des artisans doivent être un tableau']
        };
      }

      artisansData.forEach((artisan, index) => {
        try {
          // Validation basique de structure
          if (!artisan || typeof artisan !== 'object') {
            validationErrors.push(`Artisan à l'index ${index}: données invalides`);
            return;
          }

          // Sanitisation et validation des champs
          const sanitizedArtisan = {
            id: typeof artisan.id === 'number' ? artisan.id : null,
            name: sanitizeHTML(artisan.name || ''),
            job: sanitizeHTML(artisan.job || ''),
            description: sanitizeHTML(artisan.description || ''),
            location: sanitizeHTML(artisan.location || ''),
            rating: typeof artisan.rating === 'number' ? 
              Math.max(0, Math.min(5, artisan.rating)) : 0
          };

          // Validation finale
          if (sanitizedArtisan.id && 
              sanitizedArtisan.id > 0 && 
              sanitizedArtisan.name.trim().length > 0) {
            validated.push(sanitizedArtisan);
          } else {
            validationErrors.push(
              `Artisan à l'index ${index}: ID ou nom invalide`
            );
          }
        } catch (error) {
          validationErrors.push(
            `Artisan à l'index ${index}: erreur de validation - ${error.message}`
          );
        }
      });

      return {
        validatedData: validated,
        errors: validationErrors
      };
    }, [artisansData]);

    // Affichage des erreurs si nécessaire
    if (errors.length > 0) {
      console.warn('Erreurs de validation des données d\'artisans:', errors);
    }

    return (
      <>
        {errors.length > 0 && process.env.NODE_ENV === 'development' && (
          <div style={{ margin: '10px 0' }}>
            {errors.slice(0, 3).map((error, index) => (
              <ErrorMessage key={index} message={error} type="warning" />
            ))}
            {errors.length > 3 && (
              <ErrorMessage 
                message={`... et ${errors.length - 3} autres erreurs`} 
                type="info" 
              />
            )}
          </div>
        )}
        <WrappedComponent 
          {...props} 
          artisansData={validatedData}
          validationErrors={errors}
        />
      </>
    );
  };

  SecureArtisanDataWrapper.propTypes = {
    artisansData: PropTypes.array.isRequired
  };

  SecureArtisanDataWrapper.displayName = 
    `withSecureArtisanData(${WrappedComponent.displayName || WrappedComponent.name})`;

  return SecureArtisanDataWrapper;
}

/**
 * Hook pour sécuriser les données d'artisans
 */
export function useSecureArtisanData(artisansData) {
  return useMemo(() => {
    if (!Array.isArray(artisansData)) {
      return { validatedData: [], errors: ['Données invalides'] };
    }

    const validated = [];
    const errors = [];

    artisansData.forEach((artisan, index) => {
      try {
        if (!artisan || typeof artisan !== 'object') {
          errors.push(`Artisan ${index}: données manquantes`);
          return;
        }

        const sanitized = {
          id: typeof artisan.id === 'number' ? artisan.id : null,
          name: sanitizeHTML(artisan.name || ''),
          job: sanitizeHTML(artisan.job || ''),
          description: sanitizeHTML(artisan.description || ''),
          location: sanitizeHTML(artisan.location || ''),
          rating: typeof artisan.rating === 'number' ? 
            Math.max(0, Math.min(5, artisan.rating)) : 0
        };

        if (sanitized.id && sanitized.id > 0 && sanitized.name.trim()) {
          validated.push(sanitized);
        } else {
          errors.push(`Artisan ${index}: données incomplètes`);
        }
      } catch (error) {
        errors.push(`Artisan ${index}: ${error.message}`);
      }
    });

    return { validatedData: validated, errors };
  }, [artisansData]);
}