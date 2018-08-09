import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(next: ActivatedRouteSnapshot,    state: RouterStateSnapshot): boolean {     
    return this.canActivated();
  }

  private canActivated():boolean{
    // get authenticated flag from db.
    let authenticated:boolean=localStorage.getItem('AccessToken')!= null;    

    // if not authenticated redirect to login page.
    if(authenticated==false)
    {
     this.router.navigate(['account/login']);
    }    
    return authenticated;
  }
}
