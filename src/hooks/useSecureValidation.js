import { useState, useCallback } from 'react';
import { 
  validateSearchTerm, 
  validateArtisanId, 
  validateArtisanData,
  validateUrlParams 
} from '../utils/security';

/**
 * Hook personnalisé pour la validation sécurisée
 */
export const useSecureValidation = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Valide un terme de recherche
   */
  const validateSearch = useCallback(async (searchTerm) => {
    setIsValidating(true);
    setValidationErrors({});
    
    const result = await validateSearchTerm(searchTerm);
    
    if (!result.isValid) {
      setValidationErrors(prev => ({
        ...prev,
        search: result.error
      }));
    }
    
    setIsValidating(false);
    return result;
  }, []);

  /**
   * Valide un ID d'artisan
   */
  const validateId = useCallback(async (id) => {
    setIsValidating(true);
    setValidationErrors({});
    
    const result = await validateArtisanId(id);
    
    if (!result.isValid) {
      setValidationErrors(prev => ({
        ...prev,
        id: result.error
      }));
    }
    
    setIsValidating(false);
    return result;
  }, []);

  /**
   * Valide les données d'un artisan
   */
  const validateArtisan = useCallback(async (artisanData) => {
    setIsValidating(true);
    setValidationErrors({});
    
    const result = await validateArtisanData(artisanData);
    
    if (!result.isValid) {
      setValidationErrors(prev => ({
        ...prev,
        ...result.errors
      }));
    }
    
    setIsValidating(false);
    return result;
  }, []);

  /**
   * Valide les paramètres URL
   */
  const validateParams = useCallback(async (searchParams) => {
    setIsValidating(true);
    
    const result = await validateUrlParams(searchParams);
    
    setIsValidating(false);
    return result;
  }, []);

  /**
   * Efface les erreurs de validation
   */
  const clearErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  /**
   * Efface une erreur spécifique
   */
  const clearError = useCallback((fieldName) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    validationErrors,
    isValidating,
    validateSearch,
    validateId,
    validateArtisan,
    validateParams,
    clearErrors,
    clearError
  };
};