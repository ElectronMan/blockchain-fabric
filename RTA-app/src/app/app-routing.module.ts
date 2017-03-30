import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { VehicleComponent } from './Vehicle/Vehicle.component';
import { SalesContractComponent } from './SalesContract/SalesContract.component';
import { InsuranceContractComponent } from './InsuranceContract/InsuranceContract.component';
import { LoanContractComponent } from './LoanContract/LoanContract.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },

    { path: 'Vehicle', component: VehicleComponent},
    { path: 'SalesContract', component: SalesContractComponent},
    { path: 'InsuranceContract', component: InsuranceContractComponent},
    { path: 'LoanContract', component: LoanContractComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
