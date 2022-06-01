import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './signup/login.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { Login2Component } from './login/login2.component';
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
import { AboutComponent } from './about/about.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { IndustriesComponent } from './industries/industries.component';
import { ProductsComponent } from './products/products.component';
import { RenewableViewTableComponent } from './renewable-view-table/renewable-view-table.component';
import { GasViewTableComponent } from './gas-view-table/gas-view-table.component';
import { EleViewTableComponent } from './ele-view-table/ele-view-table.component';
import { WaterViewTableComponent } from './water-view-table/water-view-table.component';
import { GasLookupComponent } from './gas-lookup/gas-lookup.component';
import { WaterAditionalinfoComponent } from './water-aditionalinfo/water-aditionalinfo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCallInterceptor } from './interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { ToastrModule } from 'ngx-toastr';
import { CustomPipe } from './custom.pipe'
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
    AboutComponent,

    SolutionsComponent,

    IndustriesComponent,

    ProductsComponent,
    RenewableViewTableComponent,

    GasViewTableComponent,

    EleViewTableComponent,

    WaterViewTableComponent,

    GasLookupComponent,

    WaterAditionalinfoComponent,

    CustomPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
    }),
    BrowserAnimationsModule



  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
