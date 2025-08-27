import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://46.202.88.87:8010/usuarios/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el perfil del usuario
   * @returns Observable con los datos del perfil
   */
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil/`);
  }

  /**
   * Actualiza el perfil del usuario
   * @param profileData Datos del perfil a actualizar
   * @returns Observable con la respuesta del servidor
   */
  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/perfil/`, profileData);
  }

  /**
   * Actualiza la foto de perfil del usuario
   * @param photo Archivo de imagen
   * @returns Observable con la respuesta del servidor
   */
  updateProfilePhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', photo);
    return this.http.patch(`${this.apiUrl}/perfil/foto/`, formData);
  }
}