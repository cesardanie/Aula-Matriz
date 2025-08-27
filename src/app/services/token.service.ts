import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /**
   * Almacena el token de acceso
   * @param token Token de acceso
   */
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  /**
   * Obtiene el token de acceso
   * @returns Token de acceso o null si no existe
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Elimina el token de acceso
   */
  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  /**
   * Almacena el refresh token
   * @param token Refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  /**
   * Obtiene el refresh token
   * @returns Refresh token o null si no existe
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Elimina el refresh token
   */
  removeRefreshToken(): void {
    localStorage.removeItem('refresh_token');
  }
}