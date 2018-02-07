import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersRootComponent} from "./components/customers-root/customers-root.component";

const routes: Routes = [
  { path: '', component: CustomersRootComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
