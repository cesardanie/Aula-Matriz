import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://46.202.88.87:8010/usuarios/api';

  // inicializa en false; lo actualizamos en el constructor
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    // SAFE: constructor corre después de la inyección DI
    const token = this.tokenService.getToken();
    this.loggedIn.next(!!token);
  }

  /**
   * Realiza el login del usuario
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        if (response?.access) {
          // Almacenar tokens
          this.tokenService.setToken(response.access);
          if (response.refresh) {
            this.tokenService.setRefreshToken(response.refresh);
          }
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
   * Verifica si el usuario está autenticado (observable)
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /**
   * Verifica si existe un token almacenado (método sin efectos)
   */
  hasToken(): boolean {
    return !!this.tokenService.getToken();
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  getRefreshToken(): string | null {
    return this.tokenService.getRefreshToken();
  }
}
