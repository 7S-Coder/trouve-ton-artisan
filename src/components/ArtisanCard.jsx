import '../css/components/ArtisanCard.css';
import ContactBtn from '../components/ui/ContactBtn.jsx';

export default function ArtisanCard({ artisan }) {
    return (
        <section className="artisan-card">
            <span className="name">{artisan.name}</span>
            <span className="job">Job : {artisan.job}</span>
            <p className="description">Description : {artisan.description}</p>
            <span className="location">Location : {artisan.location}</span>
            <span className="rating">Note : {artisan.rating}</span>
            <ContactBtn />
        </section>
    );
}

// Les cards Artisans sont seulement le template pour chaque artisan
// Il faudra les générer dynamiquement avec les données du fichier artisans.json
// Par exemple, en utilisant la méthode .map() pour parcourir le tableau d'artisans
// et retourner un composant ArtisanCard pour chaque artisan avec ses données.