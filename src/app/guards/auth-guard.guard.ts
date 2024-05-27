import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';

export const authGuardGuard: CanActivateFn = (
  router:ActivatedRouteSnapshot,
   state:RouterStateSnapshot):boolean|UrlTree|Promise<boolean|UrlTree>|Observable<boolean|UrlTree> => {
const authService=inject(AuthService)
const  route:Router=inject(Router)
return authService.user.pipe(take(1),map((user)=>{
  if(user){
    return true
      }else{
  return route.createUrlTree(['/login'])
 
  }

}))
};
