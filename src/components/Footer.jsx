import logowhite from '../assets/logowhite.png';
import { Phone, Facebook, Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import '../css/components/Footer.css';

export default function Footer() {
    return (
        <>
        <footer>
            <div className='bubble'></div>
            <section>
                <div>
                <img src={logowhite} alt="Logo de trouve ton artisan" />
                <p>Conseil régional <br /> Auvergne-Rhône-Alpes</p>
                </div>
                <ul className='coordonnées'>
                    <li><strong>Lyon</strong> </li>
                    <li><a href="#"> 101 cours Charlemagne <br />CS 20033 <br />69269 LYON CEDEX 02 <br />France</a></li>
                    <li><a href="#"> <Phone size={18}/>+33 (0)4 26 73 40 00</a></li>
                    <li><a href="#"> Accueil téléphonique du lundi au vendredi <br />de 8h30 à 17h30 <br /></a></li>
                    <li><a href="#"> Tram T1 et T2 - Arrêt Hôtel de la <br /> région <br />-Montrochet</a></li>
                </ul>
                <ul className='coordonnées'>
                    <li><strong>Clermont-Ferrand</strong> </li>
                    <li><a href="#"> 59 boulevard Léon Jouhaux <br />CS 90706 <br /> 63000 CLERMONT-FERRAND <br /> France</a></li>
                    <li><a href="#"><Phone size={18}/>+33 (0)4 26 73 40 00</a> </li>
                    <li><a href="#">Accueil téléphonique du lundi au vendredi <br />de 8h30 à 17h30 <br /></a>  </li>
                    <li><a href="#">Tram A - Arrêt Musée d’Art Roger <br />Quilliot</a> </li>
                </ul>
            </section>
            <section className='bottom-footer'>
                <ul>
                    <li><a href="#">Mentions légales</a></li>
                    <li><a href="#">Données personnelles</a></li>
                    <li><a href="#">Accessibilité : partiellement conforme</a></li>
                    <li><a href="#">Presse</a></li>
                    <li><a href="#">Marchés publics</a></li>
                    <li><a href="#">Venir à la région</a></li>
                    <li><a href="#">Contact</a></li> 
                </ul>
                <ul>
                    <li><a href="#">Politique des cookies</a></li>
                </ul>
                <ul>
                    <li><a href="#">Gestion des cookies</a></li>
                </ul>
            </section>
        </footer>

        <section className='social-network'>
                <ul>
                    <li><a href="#"><Facebook /></a></li>
                    <li><a href="#"><Linkedin /></a></li>
                    <li><a href="#"><Youtube /></a></li>
                    <li><a href="#"><Instagram /></a></li>
                    <li><a href="#"><Twitter /></a></li>
                    <li><a href="#"><FaWhatsapp /></a></li>
                    <li><a href="#"><FaTiktok /></a></li>
                </ul>
            </section>
        </>

    );
}