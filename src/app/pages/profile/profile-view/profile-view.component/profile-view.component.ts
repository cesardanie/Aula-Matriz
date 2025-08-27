import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  profile: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

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

  onEdit(): void {
    this.router.navigate(['/profile/edit']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}