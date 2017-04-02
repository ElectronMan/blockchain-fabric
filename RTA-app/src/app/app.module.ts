import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { VehicleComponent } from './Vehicle/Vehicle.component';


import { VehicleService } from './Vehicle/Vehicle.service';

import {MaterialModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';


@NgModule({
    declarations: [
        AppComponent,
        // TransactionComponent,

        VehicleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        MaterialModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [
        Configuration,
        DataService,
        VehicleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
