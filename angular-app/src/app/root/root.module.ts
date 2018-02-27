import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RootComponent } from './root.component';
import {RootRoutingModule} from "./root-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutModule} from "@angular/cdk/layout";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RootRoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
