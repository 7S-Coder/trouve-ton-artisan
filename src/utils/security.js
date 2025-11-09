import DOMPurify from 'dompurify';
import * as yup from 'yup';

/**
 * Schémas de validation Yup
 */
export const validationSchemas = {
  // Validation pour les paramètres d'ID
  artisanId: yup.number()
    .integer('L\'ID doit être un nombre entier')
    .positive('L\'ID doit être positif')
    .required('L\'ID est requis'),

  // Validation pour les termes de recherche
  searchTerm: yup.string()
    .trim()
    .min(1, 'Le terme de recherche doit contenir au moins 1 caractère')
    .max(100, 'Le terme de recherche ne peut pas dépasser 100 caractères')
    .matches(/^[a-zA-Z0-9\s\-àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]+$/, 
      'Le terme de recherche contient des caractères non autorisés'),

  // Validation pour les noms d'artisan
  artisanName: yup.string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .matches(/^[a-zA-Z\s\-àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]+$/, 
      'Le nom contient des caractères non autorisés'),

  // Validation pour les descriptions
  description: yup.string()
    .trim()
    .max(500, 'La description ne peut pas dépasser 500 caractères'),

  // Validation pour les localisations
  location: yup.string()
    .trim()
    .min(2, 'La localisation doit contenir au moins 2 caractères')
    .max(100, 'La localisation ne peut pas dépasser 100 caractères')
    .matches(/^[a-zA-Z\s\-àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]+$/, 
      'La localisation contient des caractères non autorisés'),

  // Validation pour les notes
  rating: yup.number()
    .min(0, 'La note ne peut pas être inférieure à 0')
    .max(5, 'La note ne peut pas être supérieure à 5')
};

/**
 * Sanitise le contenu HTML pour éviter les attaques XSS
 * @param {string} content - Le contenu à sanitiser
 * @returns {string} - Le contenu sanitisé
 */
export const sanitizeHTML = (content) => {
  if (typeof content !== 'string') {
    return '';
  }
  
  // Configuration DOMPurify pour un nettoyage strict
  const config = {
    ALLOWED_TAGS: [], // Aucun tag HTML autorisé
    ALLOWED_ATTR: [], // Aucun attribut autorisé
    KEEP_CONTENT: true // Garde le contenu textuel
  };

  return DOMPurify.sanitize(content, config);
};

/**
 * Échappe les caractères spéciaux pour l'affichage sécurisé
 * @param {string} text - Le texte à échapper
 * @returns {string} - Le texte échappé
 */
export const escapeHtml = (text) => {
  if (typeof text !== 'string') {
    return '';
  }
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Valide un paramètre avec un schéma donné
 * @param {any} value - La valeur à valider
 * @param {yup.Schema} schema - Le schéma de validation
 * @returns {Object} - {isValid: boolean, error: string|null, sanitizedValue: any}
 */
export const validateInput = async (value, schema) => {
  try {
    const sanitizedValue = await schema.validate(value);
    return {
      isValid: true,
      error: null,
      sanitizedValue
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message,
      sanitizedValue: null
    };
  }
};

/**
 * Valide et sanitise un ID d'artisan
 * @param {string|number} id - L'ID à valider
 * @returns {Object} - Résultat de validation
 */
export const validateArtisanId = async (id) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return {
      isValid: false,
      error: 'L\'ID doit être un nombre valide',
      sanitizedValue: null
    };
  }
  
  return validateInput(numericId, validationSchemas.artisanId);
};

/**
 * Valide et sanitise un terme de recherche
 * @param {string} searchTerm - Le terme de recherche
 * @returns {Object} - Résultat de validation
 */
export const validateSearchTerm = async (searchTerm) => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return {
      isValid: false,
      error: 'Le terme de recherche est requis',
      sanitizedValue: null
    };
  }
  
  // Sanitisation HTML avant validation
  const sanitized = sanitizeHTML(searchTerm);
  return validateInput(sanitized, validationSchemas.searchTerm);
};

/**
 * Valide les données d'un artisan
 * @param {Object} artisanData - Les données de l'artisan
 * @returns {Object} - Résultat de validation
 */
export const validateArtisanData = async (artisanData) => {
  const errors = {};
  const sanitizedData = {};
  
  // Validation de l'ID
  if (artisanData.id !== undefined) {
    const idValidation = await validateArtisanId(artisanData.id);
    if (!idValidation.isValid) {
      errors.id = idValidation.error;
    } else {
      sanitizedData.id = idValidation.sanitizedValue;
    }
  }
  
  // Validation du nom
  if (artisanData.name) {
    const nameValidation = await validateInput(
      sanitizeHTML(artisanData.name), 
      validationSchemas.artisanName
    );
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
    } else {
      sanitizedData.name = nameValidation.sanitizedValue;
    }
  }
  
  // Validation de la description
  if (artisanData.description) {
    const descValidation = await validateInput(
      sanitizeHTML(artisanData.description), 
      validationSchemas.description
    );
    if (!descValidation.isValid) {
      errors.description = descValidation.error;
    } else {
      sanitizedData.description = descValidation.sanitizedValue;
    }
  }
  
  // Validation de la localisation
  if (artisanData.location) {
    const locationValidation = await validateInput(
      sanitizeHTML(artisanData.location), 
      validationSchemas.location
    );
    if (!locationValidation.isValid) {
      errors.location = locationValidation.error;
    } else {
      sanitizedData.location = locationValidation.sanitizedValue;
    }
  }
  
  // Validation de la note
  if (artisanData.rating !== undefined) {
    const ratingValidation = await validateInput(
      artisanData.rating, 
      validationSchemas.rating
    );
    if (!ratingValidation.isValid) {
      errors.rating = ratingValidation.error;
    } else {
      sanitizedData.rating = ratingValidation.sanitizedValue;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData
  };
};

/**
 * Nettoie et valide les paramètres URL
 * @param {URLSearchParams} searchParams - Les paramètres URL
 * @returns {Object} - Paramètres validés et sanitisés
 */
export const validateUrlParams = async (searchParams) => {
  const validatedParams = {};
  
  // Validation du terme de recherche
  const search = searchParams.get('search');
  if (search) {
    const searchValidation = await validateSearchTerm(search);
    if (searchValidation.isValid) {
      validatedParams.search = searchValidation.sanitizedValue;
    }
  }
  
  return validatedParams;
};