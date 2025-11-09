import '../css/components/ArtisanCard.css';
import ContactBtn from '../components/ui/ContactBtn.jsx';

export default function ArtisanCard({ artisan }) {
    // Fonction pour obtenir les 3 premiers mots de la description
    const getFirstThreeWords = (description) => {
        if (!description) return '';
        const words = description.split(' ');
        return words.slice(0, 3).join(' ') + (words.length > 4 ? '...' : '');
    };

    return (
        <a href={`/artisans/${artisan.id}`}>
            <section className="artisan-card">
                <h3 className="name">{artisan.name}</h3>
                <span className="job">Job : {artisan.job}</span>
                <p className="description">Description : {getFirstThreeWords(artisan.description)}</p>
                <span className="location">Location : {artisan.location}</span>
                <span className="rating">Note : {artisan.rating}</span>
                <ContactBtn />
            </section>
        </a>
    );
}

// Les cards Artisans sont seulement le template pour chaque artisan
// Il faudra les générer dynamiquement avec les données du fichier artisans.json
// Par exemple, en utilisant la méthode .map() pour parcourir le tableau d'artisans
// et retourner un composant ArtisanCard pour chaque artisan avec ses données.