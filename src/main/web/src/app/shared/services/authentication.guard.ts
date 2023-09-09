import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const authenticationGuard: CanActivateFn = () => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);

  return authenticationService.user$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/auth'])
        return false;
      }
    })
  )
};
