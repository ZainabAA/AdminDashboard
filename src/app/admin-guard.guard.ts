import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { inject } from '@angular/core';


export const adminGuardGuard: CanActivateFn = (route, state) => {
  const loginServive = inject(LoginService);
  const router = inject(Router);

  if (loginServive.user()?.role === 'admin') {
    return true;
  } else {
    // Redirect to the login page if the user is not authenticated
    router.navigate(['/login']);
    return false;
  }
};
