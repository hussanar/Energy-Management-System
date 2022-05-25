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
import { View1Component } from './view1/view1.component';
import { ViewWaterComponent } from './view-water/view-water.component';
import { ViewElectrictyComponent } from './view-electricty/view-electricty.component';
import { ViewGasComponent } from './view-gas/view-gas.component';
import { RenewableViewComponent } from './renewable-view/renewable-view.component';
import { DummyComponent } from './dummy/dummy.component';
import { EditFromComponent } from './edit-from/edit-from.component';
import { AboutComponent } from './about/about.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { IndustriesComponent } from './industries/industries.component';
import { ProductsComponent } from './products/products.component';
import { DocumentsComponent } from './documents/documents.component';
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

    AddentryComponent,

    View1Component,

    ViewWaterComponent,

    ViewElectrictyComponent,

    ViewGasComponent,

    RenewableViewComponent,

    DummyComponent,

    EditFromComponent,

    AboutComponent,

    SolutionsComponent,

    IndustriesComponent,

    ProductsComponent,

    DocumentsComponent
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
