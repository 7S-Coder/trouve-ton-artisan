import '../css/components/ArtisanOfMonth.css';
import ArtisanCard from './ArtisanCard';
import Artisans from '../datas/artisans.json';


export default function ArtisanOfMonth() {
    return (
        <section id="artisan-of-month" >
            <h2>Artisan du mois</h2>
            <article>
                {/* Afficher ici les trois artisans du mois (pour l'instant on affichera que les trois premiers artisans) */}
                {Artisans.slice(0, 3).map((artisan, i) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                ))}
            </article>
        </section>
    );
}