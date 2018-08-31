import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {User} from "./models/user";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from "ngx-facebook";
import {Observable} from "rxjs";


@Injectable()
export class AuthService {
  protected baseUrl = 'http://localhost:8080';

  token: string;


  constructor(private router: Router, private http: HttpClient, private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '1964708490466561',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }



  loginWithFacebook(): void {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };

    this.fb.login(loginOptions).then((response: LoginResponse) => console.log(response))
      .catch((error: any) => console.error(error));

  }

  getProfile() {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);
  }

  signUpUser(username, password, email, firstName, lastName, birthday, gender, mobile, userRoles) {
    const url = `${this.baseUrl}/api/account`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let user: User = new User(username, password, email, firstName, lastName, birthday, gender, mobile, userRoles);
    this.http.post(url,
      {
        "username": username, "password": password,
        "email": email, "firstName": firstName,
        "lastName": lastName, "birthday": birthday,
        "gender": gender, "mobile": mobile,
        "accountNonExpired": true, "accountNonLocked": true,
        "credentialsNonExpired": true, "enable": true,
        "userRoles": userRoles
      },
      {
        headers: headers,
        responseType: 'json'
      })
      .subscribe(event => {
          this.router.navigateByUrl('/content');
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        });
  }

  // signUpUser(username, password, email, firstName, lastName, birthday, gender, mobile, userRoles) {
  //   const url = `${this.baseUrl}/api/account`;
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   let body = JSON.stringify(new User(username, password, email, firstName, lastName, birthday, gender, mobile, userRoles));
  //   this.http.post(url,
  //     {
  //       body
  //     },
  //     {
  //       headers: headers,
  //       responseType: 'json'
  //     })
  //     .subscribe(event => {
  //         this.router.navigateByUrl('/content');
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.log(err.error);
  //         console.log(err.name);
  //         console.log(err.message);
  //         console.log(err.status);
  //       });
  // }


  logIn(username: string, password: string) : Observable<User> {
    const url = `${this.baseUrl}/oauth/token`;
    let headers = new HttpHeaders({'Authorization': 'Basic QXBwVXNlcjpBcHBVc2VyUGFzcw=='});
    let params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);
    // @ts-ignore XXX
    return this.http.post<User>(url, null, {headers: headers, params: params})
      .do(data =>
        localStorage.setItem("Authorization", "Bearer " + data['access_token']))
      .do(this.token = event['access_token'])
       .catch(this.handleError);






      // .subscribe(event => {
      //     localStorage.setItem("Authorization", "Bearer " + event['access_token']);
      //     this.token = event['access_token'];
      //     this.router.navigateByUrl('/content');
      //   },
      //   (err: HttpErrorResponse) => {
      //     alert(err.error['error_description']);
      //   });


  }

  logout() {
    localStorage.removeItem("Authorization");
    this.token = null;
    this.router.navigateByUrl('/content');
  }

  getToken() {
    return localStorage.getItem("Authorization")
  }

  isAuthenticated() {
    return localStorage.getItem("Authorization") != null;
  }

  private handleError(error: HttpErrorResponse): Observable<String> {
    let errorArray : JSON = JSON.parse(error.error);
    return Observable.throw(errorArray['error_description'] || 'Server error');
  }

}
