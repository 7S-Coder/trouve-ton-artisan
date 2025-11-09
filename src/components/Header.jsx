import logo from '../assets/logo.png';
import '../css/components/Header.css';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtisansData from '../datas/artisans.json';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Chercher l'artisan par nom
            const foundArtisan = ArtisansData.find(artisan => 
                artisan.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (foundArtisan) {
                // Rediriger vers la page de détail de l'artisan
                navigate(`/artisans/${foundArtisan.id}`);
            } else {
                // Rediriger vers la page artisans avec le terme de recherche
                navigate(`/artisans?search=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    return (
        <header>
            <nav>
                <a href="/"><img src={logo} alt="Logo de trouve ton artisan" /></a>
                <div>
                    <form onSubmit={handleSearch}>
                        <section id="search-bar">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-placeholder="Rechercher un artisan" 
                                placeholder="Rechercher un artisan" 
                            />
                            <button type="submit"> 
                                <Search size={16} aria-label="Rechercher un artisan" />
                            </button>
                        </section>
                    </form>
                    
                    <ul>
                        <li><a href="/artisans">Artisans</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Fabrication</a></li>
                        <li><a href="#">Alimentation</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}