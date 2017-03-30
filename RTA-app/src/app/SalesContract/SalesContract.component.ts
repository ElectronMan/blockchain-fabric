import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SalesContractService } from './SalesContract.service';
@Component({
	selector: 'app-SalesContract',
	templateUrl: './SalesContract.component.html',
	styleUrls: ['./SalesContract.component.css']
})
export class SalesContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;

  
      salesID = new FormControl("", Validators.required);
  
      price = new FormControl("", Validators.required);
  
      buyer = new FormControl("", Validators.required);
  
      seller = new FormControl("", Validators.required);
  
      vehicle = new FormControl("", Validators.required);
  


  constructor(private serviceSalesContract:SalesContractService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          salesID:this.salesID,
        
    
        
          price:this.price,
        
    
        
          buyer:this.buyer,
        
    
        
          seller:this.seller,
        
    
        
          vehicle:this.vehicle
        
    
    });
  };

  ngOnInit():void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSalesContract.getAll().then((result) => {
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "digitalVehicleAssetNetwork.SalesContract",
      
        
          "salesID":this.salesID.value,
        
      
        
          "price":this.price.value,
        
      
        
          "buyer":this.buyer.value,
        
      
        
          "seller":this.seller.value,
        
      
        
          "vehicle":this.vehicle.value
        
      
    };

    this.myForm.setValue({
      
        
          "salesID":null,
        
      
        
          "price":null,
        
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "vehicle":null
        
      
    });

    return this.serviceSalesContract.addAsset(this.asset).then(() => {
      this.myForm.setValue({
      
        
          "salesID":null,
        
      
        
          "price":null,
        
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "vehicle":null 
        
      
      });
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "digitalVehicleAssetNetwork.SalesContract",
      
        
          "salesID":this.salesID.value,
        
    
        
          "price":this.price.value,
        
    
        
          "buyer":this.buyer.value,
        
    
        
          "seller":this.seller.value,
        
    
        
          "vehicle":this.vehicle.value
        
    
    };


    return this.serviceSalesContract.updateAsset(this.asset.salesID,this.asset);
  }


  deleteAsset(): Promise<any> {

    return this.serviceSalesContract.deleteAsset(this.currentId);
  }

  setId(id:any):void{
    this.currentId = id;
  }

  getForm(id:any):Promise<any>{

    return this.serviceSalesContract.getAsset(id).then((result) => {

      let formObject = {
        
          
            "salesID":null,
          
        
          
            "price":null,
          
        
          
            "buyer":null,
          
        
          
            "seller":null,
          
        
          
            "vehicle":null 
          
        
      };



      
        if(result.salesID){
          formObject.salesID = result.salesID;
        }else{
          formObject.salesID = null;
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
      
        if(result.seller){
          formObject.seller = result.seller;
        }else{
          formObject.seller = null;
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
      
        
          "salesID":null,
        
      
        
          "price":null,
        
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "vehicle":null 
        
      
      });
  }

}
