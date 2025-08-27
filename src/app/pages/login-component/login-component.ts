import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  credentials = { username: 'carlosandresmoreno', password: '90122856_Hanz' };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/profile']);
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorMessage = 'Error en el login. Verifica tus credenciales.';
        console.error(error);
      }
    });
  }
}
