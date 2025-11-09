import Artisans from '../datas/Artisans.json';
import { useParams } from 'react-router-dom';
import '../css/pages/ArtisanDetail.css';

export default function ArtisanDetail() {
    const { id } = useParams();
    const artisanData = Artisans.find(a => a.id === parseInt(id));

    if (!artisanData) {
        return (
            <main>
                <h1>Artisan non trouvé</h1>
                <p>L'artisan avec l'ID {id} n'existe pas.</p>
            </main>
        );
    }

    return (
        <main id="container-artisan-detail">
            <h1>Détail de l'artisan</h1>
            <article className="artisan-detail-card">
                <h2>{artisanData.name}</h2>
                <p><strong>Métier :</strong> {artisanData.job}</p>
                <p><strong>Description :</strong> {artisanData.description}</p>
                <p><strong>Localisation :</strong> {artisanData.location}</p>
                <p><strong>Note :</strong> {artisanData.rating}/5</p>
            </article>
        </main>
    );
}