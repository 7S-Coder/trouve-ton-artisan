import '../css/components/ArtisanCard.css';
import ContactBtn from '../components/ui/ContactBtn.jsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { escapeHtml, sanitizeHTML } from '../utils/security';

export default function ArtisanCard({ artisan }) {
    // Validation et sécurisation des données d'artisan
    if (!artisan || typeof artisan !== 'object') {
        return null;
    }

    // Sanitisation et échappement des données
    const sanitizedArtisan = {
        id: artisan.id,
        name: escapeHtml(sanitizeHTML(artisan.name || 'Nom non disponible')),
        job: escapeHtml(sanitizeHTML(artisan.job || 'Métier non spécifié')),
        description: escapeHtml(sanitizeHTML(artisan.description || 'Aucune description')),
        location: escapeHtml(sanitizeHTML(artisan.location || 'Localisation non spécifiée')),
        rating: typeof artisan.rating === 'number' ? Math.max(0, Math.min(5, artisan.rating)) : 0
    };

    // Fonction pour obtenir les 3 premiers mots de la description de façon sécurisée
    const getFirstThreeWords = (description) => {
        if (!description || typeof description !== 'string') return 'Description non disponible';
        
        try {
            const words = description.split(' ').filter(word => word.trim() !== '');
            if (words.length === 0) return 'Description non disponible';
            
            const truncated = words.slice(0, 3).join(' ');
            return truncated + (words.length > 3 ? '...' : '');
        } catch (error) {
            console.error('Erreur lors du traitement de la description:', error);
            return 'Description non disponible';
        }
    };

    // Validation de l'ID pour le lien
    const isValidId = typeof sanitizedArtisan.id === 'number' && sanitizedArtisan.id > 0;
    
    if (!isValidId) {
        console.warn('ID d\'artisan invalide:', artisan.id);
        return null;
    }

    return (
        <Link to={`/artisans/${sanitizedArtisan.id}`} aria-label={`Voir le profil de ${sanitizedArtisan.name}`}>
            <section className="artisan-card">
                <h3 className="name">{sanitizedArtisan.name}</h3>
                <span className="job">Job : {sanitizedArtisan.job}</span>
                <p className="description">Description : {getFirstThreeWords(sanitizedArtisan.description)}</p>
                <span className="location">Location : {sanitizedArtisan.location}</span>
                <span className="rating">
                    Note : {sanitizedArtisan.rating > 0 ? `${sanitizedArtisan.rating}/5` : 'Non évaluée'}
                </span>
                <ContactBtn />
            </section>
        </Link>
    );
}

ArtisanCard.propTypes = {
    artisan: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        job: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        rating: PropTypes.number
    }).isRequired
};

// Les cards Artisans sont seulement le template pour chaque artisan
// Il faudra les générer dynamiquement avec les données du fichier artisans.json
// Par exemple, en utilisant la méthode .map() pour parcourir le tableau d'artisans
// et retourner un composant ArtisanCard pour chaque artisan avec ses données.