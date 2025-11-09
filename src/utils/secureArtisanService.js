import ArtisansRawData from '../datas/Artisans.json';
import { useSecureArtisanData } from './secureDataProvider';

/**
 * Service pour gérer les données d'artisans de façon sécurisée
 */
class SecureArtisanService {
  constructor() {
    this.rawData = ArtisansRawData;
    this.validatedData = null;
    this.lastValidation = null;
  }

  /**
   * Obtient toutes les données d'artisans validées
   */
  getAllArtisans() {
    if (!this.validatedData || this.shouldRevalidate()) {
      this.validateData();
    }
    return this.validatedData || [];
  }

  /**
   * Obtient un artisan par ID de façon sécurisée
   */
  getArtisanById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId <= 0) {
      return null;
    }

    const artisans = this.getAllArtisans();
    return artisans.find(artisan => artisan.id === numericId) || null;
  }

  /**
   * Recherche des artisans de façon sécurisée
   */
  searchArtisans(searchTerm) {
    if (!searchTerm || typeof searchTerm !== 'string') {
      return this.getAllArtisans();
    }

    const sanitizedTerm = searchTerm.toLowerCase().trim();
    const artisans = this.getAllArtisans();

    return artisans.filter(artisan => {
      return (
        artisan.name.toLowerCase().includes(sanitizedTerm) ||
        artisan.job.toLowerCase().includes(sanitizedTerm) ||
        artisan.location.toLowerCase().includes(sanitizedTerm)
      );
    });
  }

  /**
   * Obtient les artisans du mois (3 premiers validés)
   */
  getArtisansOfMonth() {
    const artisans = this.getAllArtisans();
    return artisans.slice(0, 3);
  }

  /**
   * Valide les données brutes
   */
  validateData() {
    try {
      const validated = [];
      
      if (!Array.isArray(this.rawData)) {
        console.error('Données d\'artisans invalides: pas un tableau');
        this.validatedData = [];
        return;
      }

      this.rawData.forEach((artisan, index) => {
        if (this.isValidArtisan(artisan)) {
          validated.push(this.sanitizeArtisan(artisan));
        } else {
          console.warn(`Artisan à l'index ${index} ignoré: données invalides`);
        }
      });

      this.validatedData = validated;
      this.lastValidation = Date.now();
      
      console.log(`${validated.length} artisans validés sur ${this.rawData.length}`);
    } catch (error) {
      console.error('Erreur lors de la validation des données:', error);
      this.validatedData = [];
    }
  }

  /**
   * Vérifie si un artisan a une structure valide
   */
  isValidArtisan(artisan) {
    return (
      artisan &&
      typeof artisan === 'object' &&
      typeof artisan.id === 'number' &&
      artisan.id > 0 &&
      typeof artisan.name === 'string' &&
      artisan.name.trim().length > 0 &&
      typeof artisan.job === 'string' &&
      artisan.job.trim().length > 0
    );
  }

  /**
   * Sanitise les données d'un artisan
   */
  sanitizeArtisan(artisan) {
    return {
      id: artisan.id,
      name: this.sanitizeString(artisan.name),
      job: this.sanitizeString(artisan.job),
      description: this.sanitizeString(artisan.description || ''),
      location: this.sanitizeString(artisan.location || ''),
      rating: this.sanitizeRating(artisan.rating)
    };
  }

  /**
   * Sanitise une chaîne de caractères
   */
  sanitizeString(str) {
    if (typeof str !== 'string') return '';
    
    // Suppression des caractères dangereux et des scripts
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  /**
   * Sanitise une note
   */
  sanitizeRating(rating) {
    const numRating = parseFloat(rating);
    if (isNaN(numRating)) return 0;
    return Math.max(0, Math.min(5, numRating));
  }

  /**
   * Détermine si une revalidation est nécessaire
   */
  shouldRevalidate() {
    // Revalider toutes les heures en production, immédiatement en développement
    const interval = process.env.NODE_ENV === 'development' ? 0 : 3600000;
    return !this.lastValidation || (Date.now() - this.lastValidation) > interval;
  }
}

// Instance singleton
const artisanService = new SecureArtisanService();

export default artisanService;

/**
 * Hook React pour utiliser le service d'artisans de façon sécurisée
 */
export function useSecureArtisans() {
  return {
    getAllArtisans: () => artisanService.getAllArtisans(),
    getArtisanById: (id) => artisanService.getArtisanById(id),
    searchArtisans: (term) => artisanService.searchArtisans(term),
    getArtisansOfMonth: () => artisanService.getArtisansOfMonth()
  };
}