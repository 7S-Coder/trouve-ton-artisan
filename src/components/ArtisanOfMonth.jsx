import '../css/components/ArtisanOfMonth.css';
import ArtisanCard from './ArtisanCard';
import Artisans from '../datas/Artisans.json';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { validateArtisanData } from '../utils/security';

export default function ArtisanOfMonth() {
    // Validation et filtrage sécurisé des artisans
    const validatedArtisans = useMemo(() => {
        return Artisans.slice(0, 3).filter(artisan => {
            // Validation basique côté client
            return artisan && 
                   typeof artisan.id === 'number' && 
                   artisan.id > 0 &&
                   typeof artisan.name === 'string' &&
                   artisan.name.trim().length > 0;
        });
    }, []);

    if (validatedArtisans.length === 0) {
        return (
            <section id="artisan-of-month">
                <h2>Artisan du mois</h2>
                <p>Aucun artisan disponible pour le moment.</p>
                <Link to='/artisans'>Trouver un artisan près de chez-vous</Link>
            </section>
        );
    }

    return (
        <section id="artisan-of-month">
            <h2>Artisan du mois</h2>
            <article>
                {/* Afficher les artisans validés du mois */}
                {validatedArtisans.map((artisan) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                ))}
            </article>
            <Link to='/artisans'>Trouver un artisan près de chez-vous</Link>
        </section>
    );
}