import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { SalesContract } from '../digitalVehicleAssetNetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SalesContractService {
    private NAMESPACE: string = 'digitalVehicleAssetNetwork.SalesContract';

    constructor(private dataService: DataService<SalesContract>) {
    };

    public getAll = (): Promise<SalesContract[]> => {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset = (id:any): Promise<SalesContract> => {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset = (itemToAdd: any): Promise<SalesContract> => {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset = (id:any, itemToUpdate: any): Promise<SalesContract> => {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset = (id:any): Promise<SalesContract> => {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
