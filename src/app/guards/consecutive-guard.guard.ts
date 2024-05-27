import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const consecutiveGuardGuard: CanActivateFn = (
  route:ActivatedRouteSnapshot,
   state:RouterStateSnapshot) => {
   const userCheck=localStorage.getItem('user');
   const userLoginRoute='login'
   const userRegisterRoute='/register'

  



  return true;
};
