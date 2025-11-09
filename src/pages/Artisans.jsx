import ArtisanCard from '../components/ArtisanCard.jsx';
import ArtisansData from '../datas/Artisans.json';
import '../css/pages/Artisans.css';
import { useSearchParams } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { useSecureValidation } from '../hooks/useSecureValidation';
import ErrorMessage from '../components/ui/ErrorMessage';
import { sanitizeHTML, escapeHtml } from '../utils/security';

export default function Artisans() {
    const [searchParams] = useSearchParams();
    const [validatedSearchTerm, setValidatedSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(null);
    const { validateParams } = useSecureValidation();

    // Validation sécurisée des paramètres URL
    useEffect(() => {
        const validateSearchParams = async () => {
            setSearchError(null);
            
            const validatedParams = await validateParams(searchParams);
            
            if (validatedParams.search) {
                setValidatedSearchTerm(validatedParams.search);
            } else {
                const rawSearch = searchParams.get('search');
                if (rawSearch) {
                    setSearchError('Le terme de recherche contient des caractères non autorisés');
                }
                setValidatedSearchTerm('');
            }
        };
        
        validateSearchParams();
    }, [searchParams, validateParams]);

    // Filtrage sécurisé des artisans
    const filteredArtisans = useMemo(() => {
        if (!validatedSearchTerm) return ArtisansData;
        
        try {
            return ArtisansData.filter(artisan => {
                // Sanitiser les données de l'artisan avant la comparaison
                const sanitizedName = sanitizeHTML(artisan.name || '');
                const sanitizedJob = sanitizeHTML(artisan.job || '');
                const sanitizedLocation = sanitizeHTML(artisan.location || '');
                
                const searchTermLower = validatedSearchTerm.toLowerCase();
                
                return (
                    sanitizedName.toLowerCase().includes(searchTermLower) ||
                    sanitizedJob.toLowerCase().includes(searchTermLower) ||
                    sanitizedLocation.toLowerCase().includes(searchTermLower)
                );
            });
        } catch (error) {
            console.error('Erreur lors du filtrage des artisans:', error);
            return [];
        }
    }, [validatedSearchTerm]);

    return (
        <main>
            <h1>Page Artisans</h1>
            
            {searchError && (
                <ErrorMessage message={searchError} type="error" />
            )}
            
            {validatedSearchTerm && !searchError && (
                <p>
                    Résultats de recherche pour : <strong>"{escapeHtml(validatedSearchTerm)}"</strong> 
                    ({filteredArtisans.length} résultat{filteredArtisans.length > 1 ? 's' : ''})
                </p>
            )}
            
            <section id="artisan-list">
                {filteredArtisans.length > 0 ? (
                    filteredArtisans.map((artisan) => (
                        <ArtisanCard artisan={artisan} key={artisan.id} />
                    ))
                ) : validatedSearchTerm ? (
                    <div className="no-results">
                        <p>Aucun artisan trouvé pour "{escapeHtml(validatedSearchTerm)}"</p>
                        <p>Essayez avec d'autres termes de recherche ou <a href="/artisans">voir tous les artisans</a></p>
                    </div>
                ) : null}
            </section>
        </main>
    );
}