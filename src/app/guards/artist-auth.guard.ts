import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { ArtistAuthService } from '../service/artist-auth.service';

export const artistAuthGuard: CanActivateFn =  (
  router:ActivatedRouteSnapshot,
   state:RouterStateSnapshot):boolean|UrlTree|Promise<boolean|UrlTree>|Observable<boolean|UrlTree> => {
const artistAuthService=inject(ArtistAuthService)
const  route:Router=inject(Router)
return artistAuthService.artist.pipe(take(1),map((artist)=>{
  if(artist){
    return true
      }else{
  return route.createUrlTree(['/artist/login'])
 
  }

}))
};
