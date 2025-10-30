
export interface ValidationResult {
  isValid: boolean
  message: string
}

export class AuthValidations {
  static validateEmail(email: string): ValidationResult {
    if (!email) {
      return { isValid: false, message: 'L\'email est requis' }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Format d\'email invalide' }
    }
    
    if (!email.endsWith('@youthcomputing.org')) {
      return { isValid: false, message: 'Seules les adresses @youthcomputing.org sont autorisées' }
    }
    
    return { isValid: true, message: '' }
  }

  static validatePassword(password: string): ValidationResult {
    if (!password) {
      return { isValid: false, message: 'Le mot de passe est requis' }
    }
    
    if (password.length < 8) {
      return { isValid: false, message: 'Le mot de passe doit contenir au moins 8 caractères' }
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: 'Le mot de passe doit contenir des majuscules et minuscules' }
    }
    
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: 'Le mot de passe doit contenir au moins un chiffre' }
    }
    
    return { isValid: true, message: '' }
  }

  static validateName(name: string): ValidationResult {
    if (!name) {
      return { isValid: false, message: 'Ce champ est requis' }
    }
    
    if (name.length < 2) {
      return { isValid: false, message: 'Le nom doit contenir au moins 2 caractères' }
    }
    
    return { isValid: true, message: '' }
  }

   static validateResetToken(token: string): ValidationResult {
    if (!token) {
      return { isValid: false, message: 'Token de réinitialisation manquant' }
    }
    
    if (token.length < 10) {
      return { isValid: false, message: 'Token de réinitialisation invalide' }
    }
    
    return { isValid: true, message: '' }
  }

  static validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
    if (password !== confirmPassword) {
      return { isValid: false, message: 'Les mots de passe ne correspondent pas' }
    }
    
    return { isValid: true, message: '' }
  }
}

import { z } from 'zod';

export const validationActionSchema = z.object({
  type: z.enum(['APPROVE', 'RETURN', 'ARCHIVE']),
  comment: z.string().min(1, 'Un commentaire est requis pour le retour').optional()
}).refine((data) => {
  if (data.type === 'RETURN' && !data.comment) {
    return false;
  }
  return true;
}, {
  message: 'Un commentaire est requis pour retourner une note',
  path: ['comment']
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Le commentaire ne peut pas être vide'),
  mentions: z.array(z.string()).optional()
});