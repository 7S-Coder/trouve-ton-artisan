# Trouve Ton Artisan 🔨

Une application web moderne pour trouver et contacter des artisans qualifiés dans votre région.

## 📋 Description

Trouve Ton Artisan est une plateforme qui permet de rechercher et découvrir des artisans locaux selon différents critères. L'application offre une interface intuitive pour :

- **Rechercher des artisans** par métier, localisation ou nom
- **Consulter les profils détaillés** avec descriptions et évaluations (évaluation fictive)
- **Filtrer les résultats** pour trouver l'artisan qui correspond à vos besoins (feature pas deployé)
- **Découvrir l'artisan du mois** mis en avant (Mis en avant des trois premiers artisans du fichier JON)
- **Contacter facilement** les professionnels (contact pas fonctionnelle)

## 🚀 Technologies utilisées

- **React** - Interface utilisateur moderne et réactive
- **Vite** - Build tool rapide et optimisé
- **React Router** - Navigation entre les pages
- **Lucide React** & **React Icons** - Icônes élégantes
- **CSS3** - Styles personnalisés et responsive

## 💻 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/7S-Coder/trouve-ton-artisan.git
cd trouve-ton-artisan
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en mode développement**
```bash
npm run dev
```

4. **Accéder à l'application**
Ouvrez votre navigateur et allez sur `http://localhost:5173`

## 🏗️ Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Analyse le code avec ESLint

## 📱 Fonctionnalités

### Page d'accueil
- Présentation du service
- Barre de recherche principale
- Artisan du mois mis en avant
- Navigation vers la liste complète des artisans

### Liste des artisans
- Affichage de tous les artisans disponibles
- Système de recherche et filtrage
- Cartes informatives avec évaluations

### Profil artisan
- Informations détaillées sur chaque artisan
- Coordonnées et localisation
- Bouton de contact direct

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI génériques
│   └── ...
├── pages/              # Pages de l'application
├── css/                # Styles CSS organisés
├── datas/              # Données JSON (artisans)
└── assets/             # Ressources (polices, images)
```


## 📄 Licence

Ce projet est un devoir CEF.
