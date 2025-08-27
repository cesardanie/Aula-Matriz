import { Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login-component/login-component';
import { ProfileViewComponent } from '../app/pages/profile/profile-view/profile-view.component/profile-view.component';
import { ProfileEditComponent } from '../app/pages/profile/profile-edit/profile-edit.component/profile-edit.component';
import { authGuard } from '../app/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileViewComponent, canActivate: [authGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];