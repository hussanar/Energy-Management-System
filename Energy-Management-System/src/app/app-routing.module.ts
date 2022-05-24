import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddentryComponent } from './addentry/addentry.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ElectrictyComponent } from './electricty/electricty.component';
import { GasComponent } from './gas/gas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { RenewableComponent } from './renewable/renewable.component';
import { RenewableViewComponent } from './renewable-view/renewable-view.component';
import { ViewElectrictyComponent } from './view-electricty/view-electricty.component';
import { ViewGasComponent } from './view-gas/view-gas.component';
import { ViewWaterComponent } from './view-water/view-water.component';
import { ViewComponent } from './view/view.component';
import { View1Component } from './view1/view1.component';
import { WaterComponent } from './water/water.component';
import { DummyComponent } from './dummy/dummy.component';
import { EditFromComponent } from './edit-from/edit-from.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'loginmain', component: Login2Component },
  { path: 'login', component: LoginComponent },
  { path: 'view', component: ViewComponent },
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'ele', component: ElectrictyComponent },
  { path: 'water', component: WaterComponent },
  { path: 'gas', component: GasComponent },
  { path: "renewable", component: RenewableComponent },
  { path: 'adddata', component: AddentryComponent },
  { path: 'view1comp', component: View1Component },
  { path: 'waterView', component: ViewWaterComponent },
  { path: 'eleView', component: ViewElectrictyComponent },
  { path: 'gasView', component: ViewGasComponent },
  { path: 'renewableView', component: RenewableViewComponent },
  { path: 'dummy', component: DummyComponent },
  { path: 'editform', component: EditFromComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, Login2Component]
