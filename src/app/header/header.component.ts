import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private http:HttpClient) {
  }

  onLogout() {
    this.authService.logout();
  }

  getUser(){
    const headers = new HttpHeaders({'Content-Type': 'application/json charset=utf-8', "Authorization": this.authService.getToken()});
    this.http.get('http://localhost:8080/api/account/3',{
      headers: headers
    }).subscribe(user =>
    console.log(user));
  }

}
