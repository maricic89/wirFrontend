import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UserRole} from "../models/userRole";


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
})
export class SingUpComponent {


  constructor(private authService: AuthService) {
  }

  onSingUp(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    const email = form.value.email;
    const firstName = form.value.firstname;
    const lastName = form.value.lastname;
    const birthday = form.value.inputBirthday;
    const gender = form.value.gender;
    const mobile = form.value.inputMobile;
    let userRoles : UserRole[] = [];
    userRoles.push(new UserRole(null, "ADMIN"))
    this.authService.signUpUser(username, password, email, firstName, lastName, birthday, gender, mobile, userRoles);
  }

}
