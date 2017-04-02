import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { VehicleComponent } from './Vehicle/Vehicle.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },

    { path: 'Vehicle', component: VehicleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
