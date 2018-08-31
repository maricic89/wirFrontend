import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/map';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error = "";

  constructor(private authService: AuthService, private router: Router) {
  }
  onLogIn(form: NgForm) {
    const email = form.value.username;
    const password = form.value.password;
    this.authService.logIn(email, password).subscribe(
      () => this.router.navigateByUrl('/content'),
      (error: any) =>
        this.error = error
    );
  }

  loginWithFacebook(){
    this.authService.loginWithFacebook();
  }

  getFacebookProfile(){
    this.authService.getProfile();
  }




}
