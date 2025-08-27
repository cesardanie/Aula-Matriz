import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profile: any = {
    user: {
      first_name: '',
      last_name: '',
      email: ''
    },
    telefono: '',
    tipo_usuario: 'instructor',
    tipo_naturaleza: 'natural',
    biografia: '',
    documento: '',
    linkedin: '',
    twitter: '',
    github: '',
    sitio_web: '',
    esta_verificado: false
  };
  
  selectedFile: File | null = null;
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.profileService.getProfile().subscribe({
      next: (data:any) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorMessage = 'Error al cargar el perfil';
        console.error(error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUploadPhoto(): void {
    if (!this.selectedFile) return;

    this.isSaving = true;
    this.profileService.updateProfilePhoto(this.selectedFile).subscribe({
      next: (response:any) => {
        this.isSaving = false;
        this.successMessage = 'Foto de perfil actualizada correctamente';
        this.loadProfile();
        this.selectedFile = null;
      },
      error: (error:any) => {
        this.isSaving = false;
        this.errorMessage = 'Error al subir la foto';
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.profileService.updateProfile(this.profile).subscribe({
      next: (response:any) => {
        this.isSaving = false;
        if (response.status === 'success') {
          this.successMessage = response.message || 'Perfil actualizado correctamente';
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 1500);
        } else {
          this.errorMessage = response.message || 'Error al actualizar el perfil';
        }
      },
      error: (error:any) => {
        this.isSaving = false;
        this.errorMessage = 'Error al actualizar el perfil';
        console.error(error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/profile']);
  }
}