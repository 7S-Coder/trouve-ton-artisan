import ArtisanCard from '../components/ArtisanCard.jsx';
import ArtisansData from '../datas/artisans.json';
import '../css/pages/Artisans.css';

export default function Artisans() {
    return (
        <main>
            <h1>Page Artisans</h1>
            <section id="artisan-list">
                {/* Ici, nous allons afficher la liste des artisans */}
                {ArtisansData.map((artisan) => (
                    <ArtisanCard artisan={artisan} key={artisan.id} />
                ))}
            </section>
        </main>
    );
}