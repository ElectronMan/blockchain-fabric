import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { InsuranceContract } from '../digitalVehicleAssetNetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class InsuranceContractService {
    private NAMESPACE: string = 'digitalVehicleAssetNetwork.InsuranceContract';

    constructor(private dataService: DataService<InsuranceContract>) {
    };

    public getAll = (): Promise<InsuranceContract[]> => {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset = (id:any): Promise<InsuranceContract> => {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset = (itemToAdd: any): Promise<InsuranceContract> => {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset = (id:any, itemToUpdate: any): Promise<InsuranceContract> => {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset = (id:any): Promise<InsuranceContract> => {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
