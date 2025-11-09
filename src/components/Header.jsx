import logo from '../assets/logo.png';
import '../css/components/Header.css';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArtisansData from '../datas/Artisans.json';
import { useSecureValidation } from '../hooks/useSecureValidation';
import ErrorMessage from './ui/ErrorMessage';
import { sanitizeHTML } from '../utils/security';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { validationErrors, validateSearch, clearError } = useSecureValidation();

    const handleSearch = async (e) => {
        e.preventDefault();
        
        // Nettoyer les erreurs précédentes
        clearError('search');
        
        if (!searchTerm || !searchTerm.trim()) {
            return;
        }

        // Valider et sanitiser le terme de recherche
        const validation = await validateSearch(searchTerm);
        
        if (!validation.isValid) {
            return; // L'erreur sera affichée via validationErrors
        }

        const sanitizedSearchTerm = validation.sanitizedValue;
        
        try {
            // Chercher l'artisan par nom (avec données sanitisées)
            const foundArtisan = ArtisansData.find(artisan => {
                const sanitizedArtisanName = sanitizeHTML(artisan.name);
                return sanitizedArtisanName.toLowerCase().includes(sanitizedSearchTerm.toLowerCase());
            });
            
            if (foundArtisan) {
                // Rediriger vers la page de détail de l'artisan
                navigate(`/artisans/${foundArtisan.id}`);
            } else {
                // Rediriger vers la page artisans avec le terme de recherche sécurisé
                navigate(`/artisans?search=${encodeURIComponent(sanitizedSearchTerm)}`);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        
        // Nettoyer l'erreur si elle existe
        if (validationErrors.search) {
            clearError('search');
        }
        
        // Sanitiser l'input en temps réel
        const sanitizedValue = sanitizeHTML(value);
        setSearchTerm(sanitizedValue);
    };

    return (
        <header>
            <nav>
                <Link to="/"><img src={logo} alt="Logo de trouve ton artisan" /></Link>
                <div>
                    <form onSubmit={handleSearch}>
                        <section id="search-bar">
                            <div>
                                <input 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    aria-describedby="search-error"
                                    aria-placeholder="Rechercher un artisan" 
                                    placeholder="Rechercher un artisan"
                                    maxLength="100"
                                />
                                <button type="submit" disabled={!searchTerm.trim()}> 
                                    <Search size={16} aria-label="Rechercher un artisan" />
                                </button>
                            </div>
                            {validationErrors.search && (
                                <ErrorMessage 
                                    message={validationErrors.search} 
                                    type="error"
                                />
                            )}
                        </section>
                    </form>
                    
                    <ul>
                        <li><Link to="/artisans">Artisans</Link></li>
                        <li><Link to="/batiments">Bâtiments</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/fabrication">Fabrication</Link></li>
                        <li><Link to="/alimentation">Alimentation</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}