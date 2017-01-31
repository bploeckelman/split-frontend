import { Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from './profile/profile.component'
import { AuthGuard } from './common/auth.guard'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];
