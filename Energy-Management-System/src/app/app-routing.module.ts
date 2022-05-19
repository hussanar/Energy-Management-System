import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: Login2Component },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'view', component: ViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, Login2Component]
