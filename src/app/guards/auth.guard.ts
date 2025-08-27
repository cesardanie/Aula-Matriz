import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  
  if (tokenService.getToken()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};