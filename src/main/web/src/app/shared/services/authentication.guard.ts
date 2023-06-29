import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import {UserType} from "./user-type";

export const authenticationGuard: CanActivateFn = () => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);

  return authenticationService.authenticatedUser.pipe(
    take(1),
    map((user: UserType | null) => {
      if (!user) {
        console.log('guardato');
        router.navigate(['/auth']);
        return false;
      } else {
        return true;
      }
    })
  );
};
