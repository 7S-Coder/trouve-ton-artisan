import Artisans from '../datas/Artisans.json';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/pages/ArtisanDetail.css';
import { useSecureValidation } from '../hooks/useSecureValidation';
import ErrorMessage from '../components/ui/ErrorMessage';
import { sanitizeHTML, escapeHtml } from '../utils/security';

export default function ArtisanDetail() {
    const { id } = useParams();
    const [artisanData, setArtisanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { validationErrors, validateId, validateArtisan } = useSecureValidation();

    useEffect(() => {
        const loadArtisan = async () => {
            setLoading(true);
            
            // Valider l'ID reçu en paramètre
            const idValidation = await validateId(id);
            
            if (!idValidation.isValid) {
                setLoading(false);
                return;
            }
            
            const sanitizedId = idValidation.sanitizedValue;
            
            // Rechercher l'artisan avec l'ID validé
            const foundArtisan = Artisans.find(a => a.id === sanitizedId);
            
            if (foundArtisan) {
                // Valider et sanitiser les données de l'artisan
                const artisanValidation = await validateArtisan(foundArtisan);
                
                if (artisanValidation.isValid) {
                    setArtisanData(artisanValidation.sanitizedData);
                } else {
                    console.error('Données d\'artisan invalides:', artisanValidation.errors);
                    setArtisanData(null);
                }
            }
            
            setLoading(false);
        };
        
        loadArtisan();
    }, [id, validateId, validateArtisan]);

    if (loading) {
        return (
            <main>
                <div className="loading">Chargement...</div>
            </main>
        );
    }

    // Affichage des erreurs de validation d'ID
    if (validationErrors.id) {
        return (
            <main>
                <h1>Erreur</h1>
                <ErrorMessage message={validationErrors.id} type="error" />
                <p>
                    <a href="/">Retourner à l'accueil</a> ou{' '}
                    <a href="/artisans">voir tous les artisans</a>
                </p>
            </main>
        );
    }

    // Artisan non trouvé après validation
    if (!artisanData) {
        return (
            <main>
                <h1>Artisan non trouvé</h1>
                <ErrorMessage 
                    message={`Aucun artisan trouvé avec l'ID "${escapeHtml(id)}".`} 
                    type="warning" 
                />
                <p>
                    <a href="/">Retourner à l'accueil</a> ou{' '}
                    <a href="/artisans">voir tous les artisans</a>
                </p>
            </main>
        );
    }

    return (
        <main id="container-artisan-detail">
            <h1>Détail de l'artisan</h1>
            <article className="artisan-detail-card">
                <h2>{escapeHtml(artisanData.name)}</h2>
                <p><strong>Métier :</strong> {escapeHtml(artisanData.job || 'Non spécifié')}</p>
                <p><strong>Description :</strong> {escapeHtml(artisanData.description || 'Aucune description disponible')}</p>
                <p><strong>Localisation :</strong> {escapeHtml(artisanData.location || 'Non spécifiée')}</p>
                <p><strong>Note :</strong> {artisanData.rating ? `${artisanData.rating}/5` : 'Non évaluée'}</p>
            </article>
        </main>
    );
}