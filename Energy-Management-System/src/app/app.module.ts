import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { Login2Component } from './login2/login2.component';
import { MainComponent } from './main/main.component';
import { Login1Component } from './login1/login1.component';
import { ViewComponent } from './view/view.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ElectrictyComponent } from './electricty/electricty.component';
import { WaterComponent } from './water/water.component';
import { GasComponent } from './gas/gas.component';
import { RenewableComponent } from './renewable/renewable.component';
import { AddentryComponent } from './addentry/addentry.component';
@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,

    routingComponents,

    NavComponent,

    FooterComponent,

    Login2Component,

    MainComponent,

    Login1Component,

    ViewComponent,

    DashBoardComponent,

    ElectrictyComponent,

    WaterComponent,

    GasComponent,

    RenewableComponent,

    AddentryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
