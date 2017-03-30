import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { LoanContract } from '../digitalVehicleAssetNetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LoanContractService {
    private NAMESPACE: string = 'digitalVehicleAssetNetwork.LoanContract';

    constructor(private dataService: DataService<LoanContract>) {
    };

    public getAll = (): Promise<LoanContract[]> => {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset = (id:any): Promise<LoanContract> => {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset = (itemToAdd: any): Promise<LoanContract> => {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset = (id:any, itemToUpdate: any): Promise<LoanContract> => {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset = (id:any): Promise<LoanContract> => {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
