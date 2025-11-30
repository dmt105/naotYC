import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Configuration de base
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const TIMEOUT = 10000; // 10 seconds

// Interface pour la réponse API standard
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Interface pour les erreurs API
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  status: number;
}

class AxiosClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Ajouter le token JWT si disponible
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log des requêtes en développement
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
        }

        return config;
      },
      (error) => {
        console.error(' Request Error:', error);
        return Promise.reject(this.normalizeError(error));
      }
    );

    // Response interceptor - CORRECTION ICI
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log des réponses en développement
        if (process.env.NODE_ENV === 'development') {
          console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
        }

        // Normaliser la réponse mais garder le format AxiosResponse
        const normalizedData = this.normalizeResponseData(response.data);
        return {
          ...response,
          data: normalizedData
        };
      },
      (error: AxiosError) => {
        const normalizedError = this.normalizeError(error);

        // Gestion spécifique des erreurs HTTP
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Token expiré ou invalide - déconnexion
              this.handleUnauthorized();
              break;
            case 403:
              console.warn(' Accès refusé:', error.response.data);
              break;
            case 404:
              console.warn('Ressource non trouvée:', error.config?.url);
              break;
            case 429:
              console.warn('Trop de requêtes:', error.response.data);
              break;
            case 500:
              console.error('Erreur serveur:', error.response.data);
              break;
            default:
              console.error('Erreur HTTP:', error.response.status, error.response.data);
          }
        } else if (error.request) {
          console.error('Erreur réseau - Pas de réponse du serveur');
        } else {
          console.error(' Erreur de configuration:', error.message);
        }

        return Promise.reject(normalizedError);
      }
    );
  }

  // CORRECTION : Cette fonction normalise seulement les données, pas toute la réponse
  private normalizeResponseData(data: any): ApiResponse {
    // Si les données ont déjà le format standard, les retourner telles quelles
    if (data && typeof data === 'object' && 'success' in data) {
      return data as ApiResponse;
    }

    // Sinon, normaliser les données
    return {
      data: data,
      success: true,
      message: 'Operation successful'
    };
  }

  private normalizeError(error: AxiosError): ApiError {
    if (error.response) {
      // Erreur avec réponse du serveur
      const responseData = error.response.data as any;
      return {
        message: responseData?.message || error.message || 'Une erreur est survenue',
        code: responseData?.code,
        details: responseData?.details,
        status: error.response.status
      };
    } else if (error.request) {
      // Erreur sans réponse (réseau)
      return {
        message: 'Impossible de contacter le serveur. Vérifiez votre connexion internet.',
        status: 0
      };
    } else {
      // Erreur de configuration
      return {
        message: error.message || 'Erreur de configuration',
        status: -1
      };
    }
  }

  private getToken(): string | null {
    // Récupérer le token depuis le localStorage ou un store d'état
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || 
             sessionStorage.getItem('auth_token');
    }
    return null;
  }

  private handleUnauthorized() {
    // Nettoyer les tokens et rediriger vers la page de login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');
      
      // Redirection vers la page de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
      }
    }
  }

  // CORRECTION : Les méthodes retournent directement ApiResponse<T>
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Méthodes pour upload de fichiers
  public async uploadFile<T = any>(
    url: string, 
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.instance.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  // Méthode pour télécharger des fichiers
  public async downloadFile(url: string, filename?: string): Promise<void> {
    const response = await this.instance.get(url, {
      responseType: 'blob',
    });

    // Créer un lien de téléchargement
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Méthodes pour gérer l'authentification
  public setAuthToken(token: string, persist: boolean = true): void {
    if (persist) {
      localStorage.setItem('auth_token', token);
    } else {
      sessionStorage.setItem('auth_token', token);
    }
  }

  public removeAuthToken(): void {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Méthode pour tester la connexion
  public async healthCheck(): Promise<boolean> {
    try {
      await this.instance.get('/health');
      return true;
    } catch {
      return false;
    }
  }

  // Méthode pour obtenir l'instance axios native (pour cas spéciaux)
  public getNativeInstance(): AxiosInstance {
    return this.instance;
  }
}

// Instance singleton
export const axiosClient = new AxiosClient();

// Hook personnalisé pour utiliser le client dans les composants React
export const useApiClient = () => {
  return axiosClient;
};

// Export des types
export type { AxiosRequestConfig, AxiosResponse };