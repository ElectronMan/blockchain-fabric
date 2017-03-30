import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehicleService } from './Vehicle.service';
@Component({
	selector: 'app-Vehicle',
	templateUrl: './Vehicle.component.html',
	styleUrls: ['./Vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;

  
      chassisNumber = new FormControl("", Validators.required);
  
      make = new FormControl("", Validators.required);
  
      model = new FormControl("", Validators.required);
  
      licensePlate = new FormControl("", Validators.required);
  
      eTrafficNumber = new FormControl("", Validators.required);
  
      state = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  
      salesContract = new FormControl("", Validators.required);
  
      insuranceContract = new FormControl("", Validators.required);
  
      loanContract = new FormControl("", Validators.required);
  


  constructor(private serviceVehicle:VehicleService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          chassisNumber:this.chassisNumber,
        
    
        
          make:this.make,
        
    
        
          model:this.model,
        
    
        
          licensePlate:this.licensePlate,
        
    
        
          eTrafficNumber:this.eTrafficNumber,
        
    
        
          state:this.state,
        
    
        
          owner:this.owner,
        
    
        
          salesContract:this.salesContract,
        
    
        
          insuranceContract:this.insuranceContract,
        
    
        
          loanContract:this.loanContract
        
    
    });
  };

  ngOnInit():void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVehicle.getAll().then((result) => {
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "digitalVehicleAssetNetwork.Vehicle",
      
        
          "chassisNumber":this.chassisNumber.value,
        
      
        
          "make":this.make.value,
        
      
        
          "model":this.model.value,
        
      
        
          "licensePlate":this.licensePlate.value,
        
      
        
          "eTrafficNumber":this.eTrafficNumber.value,
        
      
        
          "state":this.state.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "salesContract":this.salesContract.value,
        
      
        
          "insuranceContract":this.insuranceContract.value,
        
      
        
          "loanContract":this.loanContract.value
        
      
    };

    this.myForm.setValue({
      
        
          "chassisNumber":null,
        
      
        
          "make":null,
        
      
        
          "model":null,
        
      
        
          "licensePlate":null,
        
      
        
          "eTrafficNumber":null,
        
      
        
          "state":null,
        
      
        
          "owner":null,
        
      
        
          "salesContract":null,
        
      
        
          "insuranceContract":null,
        
      
        
          "loanContract":null
        
      
    });

    return this.serviceVehicle.addAsset(this.asset).then(() => {
      this.myForm.setValue({
      
        
          "chassisNumber":null,
        
      
        
          "make":null,
        
      
        
          "model":null,
        
      
        
          "licensePlate":null,
        
      
        
          "eTrafficNumber":null,
        
      
        
          "state":null,
        
      
        
          "owner":null,
        
      
        
          "salesContract":null,
        
      
        
          "insuranceContract":null,
        
      
        
          "loanContract":null 
        
      
      });
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "digitalVehicleAssetNetwork.Vehicle",
      
        
          "chassisNumber":this.chassisNumber.value,
        
    
        
          "make":this.make.value,
        
    
        
          "model":this.model.value,
        
    
        
          "licensePlate":this.licensePlate.value,
        
    
        
          "eTrafficNumber":this.eTrafficNumber.value,
        
    
        
          "state":this.state.value,
        
    
        
          "owner":this.owner.value,
        
    
        
          "salesContract":this.salesContract.value,
        
    
        
          "insuranceContract":this.insuranceContract.value,
        
    
        
          "loanContract":this.loanContract.value
        
    
    };


    return this.serviceVehicle.updateAsset(this.asset.chassisNumber,this.asset);
  }


  deleteAsset(): Promise<any> {

    return this.serviceVehicle.deleteAsset(this.currentId);
  }

  setId(id:any):void{
    this.currentId = id;
  }

  getForm(id:any):Promise<any>{

    return this.serviceVehicle.getAsset(id).then((result) => {

      let formObject = {
        
          
            "chassisNumber":null,
          
        
          
            "make":null,
          
        
          
            "model":null,
          
        
          
            "licensePlate":null,
          
        
          
            "eTrafficNumber":null,
          
        
          
            "state":null,
          
        
          
            "owner":null,
          
        
          
            "salesContract":null,
          
        
          
            "insuranceContract":null,
          
        
          
            "loanContract":null 
          
        
      };



      
        if(result.chassisNumber){
          formObject.chassisNumber = result.chassisNumber;
        }else{
          formObject.chassisNumber = null;
        }
      
        if(result.make){
          formObject.make = result.make;
        }else{
          formObject.make = null;
        }
      
        if(result.model){
          formObject.model = result.model;
        }else{
          formObject.model = null;
        }
      
        if(result.licensePlate){
          formObject.licensePlate = result.licensePlate;
        }else{
          formObject.licensePlate = null;
        }
      
        if(result.eTrafficNumber){
          formObject.eTrafficNumber = result.eTrafficNumber;
        }else{
          formObject.eTrafficNumber = null;
        }
      
        if(result.state){
          formObject.state = result.state;
        }else{
          formObject.state = null;
        }
      
        if(result.owner){
          formObject.owner = result.owner;
        }else{
          formObject.owner = null;
        }
      
        if(result.salesContract){
          formObject.salesContract = result.salesContract;
        }else{
          formObject.salesContract = null;
        }
      
        if(result.insuranceContract){
          formObject.insuranceContract = result.insuranceContract;
        }else{
          formObject.insuranceContract = null;
        }
      
        if(result.loanContract){
          formObject.loanContract = result.loanContract;
        }else{
          formObject.loanContract = null;
        }
      

      this.myForm.setValue(formObject);

    })

  }

  resetForm():void{
    this.myForm.setValue({
      
        
          "chassisNumber":null,
        
      
        
          "make":null,
        
      
        
          "model":null,
        
      
        
          "licensePlate":null,
        
      
        
          "eTrafficNumber":null,
        
      
        
          "state":null,
        
      
        
          "owner":null,
        
      
        
          "salesContract":null,
        
      
        
          "insuranceContract":null,
        
      
        
          "loanContract":null 
        
      
      });
  }

}
