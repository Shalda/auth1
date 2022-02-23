import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MsalCustomGuard} from "./msal-custom.guard";

const routes: Routes = [
  {
    path: 'dashboard-app',
    component: DashboardComponent,
    canActivate: [MsalCustomGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
