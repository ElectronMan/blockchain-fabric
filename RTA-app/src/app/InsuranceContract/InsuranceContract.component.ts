import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { InsuranceContractService } from './InsuranceContract.service';
@Component({
	selector: 'app-InsuranceContract',
	templateUrl: './InsuranceContract.component.html',
	styleUrls: ['./InsuranceContract.component.css']
})
export class InsuranceContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;

  
      insuranceID = new FormControl("", Validators.required);
  
      price = new FormControl("", Validators.required);
  
      buyer = new FormControl("", Validators.required);
  
      insurer = new FormControl("", Validators.required);
  
      vehicle = new FormControl("", Validators.required);
  


  constructor(private serviceInsuranceContract:InsuranceContractService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          insuranceID:this.insuranceID,
        
    
        
          price:this.price,
        
    
        
          buyer:this.buyer,
        
    
        
          insurer:this.insurer,
        
    
        
          vehicle:this.vehicle
        
    
    });
  };

  ngOnInit():void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceInsuranceContract.getAll().then((result) => {
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "digitalVehicleAssetNetwork.InsuranceContract",
      
        
          "insuranceID":this.insuranceID.value,
        
      
        
          "price":this.price.value,
        
      
        
          "buyer":this.buyer.value,
        
      
        
          "insurer":this.insurer.value,
        
      
        
          "vehicle":this.vehicle.value
        
      
    };

    this.myForm.setValue({
      
        
          "insuranceID":null,
        
      
        
          "price":null,
        
      
        
          "buyer":null,
        
      
        
          "insurer":null,
        
      
        
          "vehicle":null
        
      
    });

    return this.serviceInsuranceContract.addAsset(this.asset).then(() => {
      this.myForm.setValue({
      
        
          "insuranceID":null,
        
      
        
          "price":null,
        
      
        
          "buyer":null,
        
      
        
          "insurer":null,
        
      
        
          "vehicle":null 
        
      
      });
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "digitalVehicleAssetNetwork.InsuranceContract",
      
        
          "insuranceID":this.insuranceID.value,
        
    
        
          "price":this.price.value,
        
    
        
          "buyer":this.buyer.value,
        
    
        
          "insurer":this.insurer.value,
        
    
        
          "vehicle":this.vehicle.value
        
    
    };


    return this.serviceInsuranceContract.updateAsset(this.asset.insuranceID,this.asset);
  }


  deleteAsset(): Promise<any> {

    return this.serviceInsuranceContract.deleteAsset(this.currentId);
  }

  setId(id:any):void{
    this.currentId = id;
  }

  getForm(id:any):Promise<any>{

    return this.serviceInsuranceContract.getAsset(id).then((result) => {

      let formObject = {
        
          
            "insuranceID":null,
          
        
          
            "price":null,
          
        
          
            "buyer":null,
          
        
          
            "insurer":null,
          
        
          
            "vehicle":null 
          
        
      };



      
        if(result.insuranceID){
          formObject.insuranceID = result.insuranceID;
        }else{
          formObject.insuranceID = null;
        }
      
        if(result.price){
          formObject.price = result.price;
        }else{
          formObject.price = null;
        }
      
        if(result.buyer){
          formObject.buyer = result.buyer;
        }else{
          formObject.buyer = null;
        }
      
        if(result.insurer){
          formObject.insurer = result.insurer;
        }else{
          formObject.insurer = null;
        }
      
        if(result.vehicle){
          formObject.vehicle = result.vehicle;
        }else{
          formObject.vehicle = null;
        }
      

      this.myForm.setValue(formObject);

    })

  }

  resetForm():void{
    this.myForm.setValue({
      
        
          "insuranceID":null,
        
      
        
          "price":null,
        
      
        
          "buyer":null,
        
      
        
          "insurer":null,
        
      
        
          "vehicle":null 
        
      
      });
  }

}
