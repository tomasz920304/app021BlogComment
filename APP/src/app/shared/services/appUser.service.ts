import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../entities/app-user.entity';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  login(formData) {
    return this.http.post(this.url + 'appUsers/login', formData);
  }

  register(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.url + "appusers/register", appUser);
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}