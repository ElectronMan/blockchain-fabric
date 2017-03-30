import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoanContractService } from './LoanContract.service';
@Component({
	selector: 'app-LoanContract',
	templateUrl: './LoanContract.component.html',
	styleUrls: ['./LoanContract.component.css']
})
export class LoanContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;

  
      loanID = new FormControl("", Validators.required);
  
      lendee = new FormControl("", Validators.required);
  
      lender = new FormControl("", Validators.required);
  
      vehicle = new FormControl("", Validators.required);
  


  constructor(private serviceLoanContract:LoanContractService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          loanID:this.loanID,
        
    
        
          lendee:this.lendee,
        
    
        
          lender:this.lender,
        
    
        
          vehicle:this.vehicle
        
    
    });
  };

  ngOnInit():void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLoanContract.getAll().then((result) => {
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "digitalVehicleAssetNetwork.LoanContract",
      
        
          "loanID":this.loanID.value,
        
      
        
          "lendee":this.lendee.value,
        
      
        
          "lender":this.lender.value,
        
      
        
          "vehicle":this.vehicle.value
        
      
    };

    this.myForm.setValue({
      
        
          "loanID":null,
        
      
        
          "lendee":null,
        
      
        
          "lender":null,
        
      
        
          "vehicle":null
        
      
    });

    return this.serviceLoanContract.addAsset(this.asset).then(() => {
      this.myForm.setValue({
      
        
          "loanID":null,
        
      
        
          "lendee":null,
        
      
        
          "lender":null,
        
      
        
          "vehicle":null 
        
      
      });
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "digitalVehicleAssetNetwork.LoanContract",
      
        
          "loanID":this.loanID.value,
        
    
        
          "lendee":this.lendee.value,
        
    
        
          "lender":this.lender.value,
        
    
        
          "vehicle":this.vehicle.value
        
    
    };


    return this.serviceLoanContract.updateAsset(this.asset.loanID,this.asset);
  }


  deleteAsset(): Promise<any> {

    return this.serviceLoanContract.deleteAsset(this.currentId);
  }

  setId(id:any):void{
    this.currentId = id;
  }

  getForm(id:any):Promise<any>{

    return this.serviceLoanContract.getAsset(id).then((result) => {

      let formObject = {
        
          
            "loanID":null,
          
        
          
            "lendee":null,
          
        
          
            "lender":null,
          
        
          
            "vehicle":null 
          
        
      };



      
        if(result.loanID){
          formObject.loanID = result.loanID;
        }else{
          formObject.loanID = null;
        }
      
        if(result.lendee){
          formObject.lendee = result.lendee;
        }else{
          formObject.lendee = null;
        }
      
        if(result.lender){
          formObject.lender = result.lender;
        }else{
          formObject.lender = null;
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
      
        
          "loanID":null,
        
      
        
          "lendee":null,
        
      
        
          "lender":null,
        
      
        
          "vehicle":null 
        
      
      });
  }

}
