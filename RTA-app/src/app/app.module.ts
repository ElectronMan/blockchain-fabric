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
import { SalesContractComponent } from './SalesContract/SalesContract.component';
import { InsuranceContractComponent } from './InsuranceContract/InsuranceContract.component';
import { LoanContractComponent } from './LoanContract/LoanContract.component';


import { VehicleService } from './Vehicle/Vehicle.service';
import { SalesContractService } from './SalesContract/SalesContract.service';
import { InsuranceContractService } from './InsuranceContract/InsuranceContract.service';
import { LoanContractService } from './LoanContract/LoanContract.service';


@NgModule({
  declarations: [
    AppComponent,
    // TransactionComponent,
    
    VehicleComponent,
    SalesContractComponent,
    InsuranceContractComponent,
    LoanContractComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService,
    VehicleService,
    SalesContractService,
    InsuranceContractService,
    LoanContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
