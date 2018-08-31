import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ContentComponent} from "./content/content.component";
import {ProtectedComponent} from "./protected/protected.component";
import {SingUpComponent} from "./auth/singup/singup.component";
import {AuthGuard} from "./auth/auth-guard.service";
import {PageNotFoundComponent} from "./shared/notFound.component";

const routes: Routes = [
  { path: 'content', component: ContentComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/singup', component: SingUpComponent },
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRootRoutingModule {
}
