import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../digitalVehicleAssetNetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VehicleService {
    private NAMESPACE: string = 'digitalVehicleAssetNetwork.Vehicle';

    constructor(private dataService: DataService<Vehicle>) {
    };

    public getAll = (): Promise<Vehicle[]> => {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset = (id:any): Promise<Vehicle> => {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset = (itemToAdd: any): Promise<Vehicle> => {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset = (id:any, itemToUpdate: any): Promise<Vehicle> => {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset = (id:any): Promise<Vehicle> => {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
