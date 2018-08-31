import {UserRole} from "./userRole";

export class User {

  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  mobile: string;
  accountNonExpired: Boolean;
  accountNonLocked: Boolean;
  credentialsNonExpired: Boolean;
  enable: Boolean;
  userRoles: UserRole[];


  constructor(username: string, password: string, email: string, firstName: string, lastName: string, birthday: string, gender: string, mobile: string, userRoles: UserRole[]) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.gender = gender;
    this.mobile = mobile;
    this.accountNonExpired = true;
    this.accountNonLocked = true;
    this.credentialsNonExpired = true;
    this.enable = true;
    this.userRoles = userRoles;
  }
}
