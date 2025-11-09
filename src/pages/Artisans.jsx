import ArtisanCard from '../components/ArtisanCard.jsx';
import ArtisansData from '../datas/Artisans.json';
import '../css/pages/Artisans.css';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function Artisans() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search');

    // Filtrer les artisans selon le terme de recherche
    const filteredArtisans = useMemo(() => {
        if (!searchTerm) return ArtisansData;
        
        return ArtisansData.filter(artisan =>
            artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artisan.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artisan.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <main>
            <h1>Page Artisans</h1>
            {searchTerm && (
                <p>Résultats de recherche pour : <strong>"{searchTerm}"</strong> ({filteredArtisans.length} résultat{filteredArtisans.length > 1 ? 's' : ''})</p>
            )}
            <section id="artisan-list">
                {/* Ici, nous allons afficher la liste des artisans */}
                {filteredArtisans.length > 0 ? (
                    filteredArtisans.map((artisan) => (
                        <ArtisanCard artisan={artisan} key={artisan.id} />
                    ))
                ) : (
                    <p>Aucun artisan trouvé pour "{searchTerm}"</p>
                )}
            </section>
        </main>
    );
}