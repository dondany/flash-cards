import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = () => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);

  if (authenticationService.isSignedIn()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
