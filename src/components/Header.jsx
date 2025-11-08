import logo from '../assets/logo.png';
import '../css/pages/components/Header.css';
import { Search } from 'lucide-react';

export default function Header() {

    return (
        <header>
            <nav>
                <img src={logo} alt="Logo de trouve ton artisan" />
                <div>
                    <section id="search-bar">
                        <input type="text" />
                        <button> <Search size={16}/></button>
                    </section>
                    
                    <ul>
                        <li><a href="#">Batiment</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Fabrication</a></li>
                        <li><a href="#">Alimentation</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}