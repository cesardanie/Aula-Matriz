import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://46.202.88.87:8010/usuarios/api';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    private router: Router
  ) { }

  /**
   * Realiza el login del usuario
   * @param credentials Objeto con username y password
   * @returns Observable con la respuesta del servidor
   */
  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        if (response.access) {
          // Almacenar tokens
          this.tokenService.setToken(response.access);
          this.tokenService.setRefreshToken(response.refresh);
          // Actualizar estado de autenticación
          this.loggedIn.next(true);
        }
      })
    );
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    // Eliminar tokens
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    // Actualizar estado de autenticación
    this.loggedIn.next(false);
    // Redirigir al login
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns Observable con el estado de autenticación
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /**
   * Verifica si existe un token almacenado
   * @returns true si existe un token, false en caso contrario
   */
  private hasToken(): boolean {
    return !!this.tokenService.getToken();
  }

  /**
   * Obtiene el token de acceso actual
   * @returns Token de acceso o null si no existe
   */
  getToken(): string | null {
    return this.tokenService.getToken();
  }

  /**
   * Obtiene el refresh token actual
   * @returns Refresh token o null si no existe
   */
  getRefreshToken(): string | null {
    return this.tokenService.getRefreshToken();
  }
}