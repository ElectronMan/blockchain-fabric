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


    chassisNo = new FormControl("", Validators.required);

    engineNo = new FormControl("", Validators.required);

    manufacturingYear = new FormControl("", Validators.required);

    countryOfOrigin = new FormControl("", Validators.required);

    vehicleType = new FormControl("", Validators.required);

    vehicleClassification = new FormControl("", Validators.required);

    color = new FormControl("", Validators.required);

    grossVehicleWeight = new FormControl("", Validators.required);

    emptyWeight = new FormControl("", Validators.required);

    state = new FormControl("", Validators.required);

    vehicleLicense = new FormControl("", Validators.required);

    salesContract = new FormControl("", Validators.required);

    insuranceContract = new FormControl("", Validators.required);

    loanContract = new FormControl("", Validators.required);

    dealer = new FormControl("", Validators.required);



    constructor(private serviceVehicle: VehicleService, fb: FormBuilder) {
        this.myForm = fb.group({


            chassisNo: this.chassisNo,



            engineNo: this.engineNo,



            manufacturingYear: this.manufacturingYear,



            countryOfOrigin: this.countryOfOrigin,



            vehicleType: this.vehicleType,



            vehicleClassification: this.vehicleClassification,



            color: this.color,



            grossVehicleWeight: this.grossVehicleWeight,



            emptyWeight: this.emptyWeight,



            state: this.state,



            vehicleLicense: this.vehicleLicense,



            salesContract: this.salesContract,



            insuranceContract: this.insuranceContract,



            loanContract: this.loanContract,



            dealer: this.dealer


        });
    };

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): Promise<any> {
        let tempList = [];
        return this.serviceVehicle.getAll().then((result) => {
            result.forEach(asset => {
                tempList.push(asset);
            });
            this.allAssets = tempList;
            this.allAssets = [
                {
                    chassisNo: 'CV12341234', engineNo: '123423', manufacturingYear: 2012, countryOfOrigin: 'Canada',
                    vehicleType: 'Toyota Yaris', vehicleClassification: 'SALOON', color: 'red', grossVehicleWeight: 1800,
                    emptyWeight: 1000, state: 'WAITING_CUSTOMS_CLEARANCE', dealer: 'Toyota'
                },
                {
                    chassisNo: 'CV555555', engineNo: '666666', manufacturingYear: 2012, countryOfOrigin: 'Canada',
                    vehicleType: 'Toyota Yaris', vehicleClassification: 'SALOON', color: 'red', grossVehicleWeight: 1800,
                    emptyWeight: 1000, state: 'WAITING_CUSTOMS_CLEARANCE', dealer: 'Toyota'
                }
            ];
        });
    }

    addAsset(form: any): Promise<any> {

        this.asset = {
            $class: "digitalVehicleAssetNetwork.Vehicle",


            "chassisNo": this.chassisNo.value,



            "engineNo": this.engineNo.value,



            "manufacturingYear": this.manufacturingYear.value,



            "countryOfOrigin": this.countryOfOrigin.value,



            "vehicleType": this.vehicleType.value,



            "vehicleClassification": this.vehicleClassification.value,



            "color": this.color.value,



            "grossVehicleWeight": this.grossVehicleWeight.value,



            "emptyWeight": this.emptyWeight.value,



            "state": this.state.value,



            "vehicleLicense": this.vehicleLicense.value,



            "salesContract": this.salesContract.value,



            "insuranceContract": this.insuranceContract.value,



            "loanContract": this.loanContract.value,



            "dealer": this.dealer.value


        };

        this.myForm.setValue({


            "chassisNo": null,



            "engineNo": null,



            "manufacturingYear": null,



            "countryOfOrigin": null,



            "vehicleType": null,



            "vehicleClassification": null,



            "color": null,



            "grossVehicleWeight": null,



            "emptyWeight": null,



            "state": null,



            "vehicleLicense": null,



            "salesContract": null,



            "insuranceContract": null,



            "loanContract": null,



            "dealer": null


        });

        return this.serviceVehicle.addAsset(this.asset).then(() => {
            this.myForm.setValue({


                "chassisNo": null,



                "engineNo": null,



                "manufacturingYear": null,



                "countryOfOrigin": null,



                "vehicleType": null,



                "vehicleClassification": null,



                "color": null,



                "grossVehicleWeight": null,



                "emptyWeight": null,



                "state": null,



                "vehicleLicense": null,



                "salesContract": null,



                "insuranceContract": null,



                "loanContract": null,



                "dealer": null


            });
        });
    }


    updateAsset(form: any): Promise<any> {
        this.asset = {
            $class: "digitalVehicleAssetNetwork.Vehicle",


            "chassisNo": this.chassisNo.value,



            "engineNo": this.engineNo.value,



            "manufacturingYear": this.manufacturingYear.value,



            "countryOfOrigin": this.countryOfOrigin.value,



            "vehicleType": this.vehicleType.value,



            "vehicleClassification": this.vehicleClassification.value,



            "color": this.color.value,



            "grossVehicleWeight": this.grossVehicleWeight.value,



            "emptyWeight": this.emptyWeight.value,



            "state": this.state.value,



            "vehicleLicense": this.vehicleLicense.value,



            "salesContract": this.salesContract.value,



            "insuranceContract": this.insuranceContract.value,



            "loanContract": this.loanContract.value,



            "dealer": this.dealer.value


        };


        return this.serviceVehicle.updateAsset(this.asset.chassisNo, this.asset);
    }


    deleteAsset(): Promise<any> {

        return this.serviceVehicle.deleteAsset(this.currentId);
    }

    setId(id: any): void {
        this.currentId = id;
    }

    getForm(id: any): Promise<any> {

        return this.serviceVehicle.getAsset(id).then((result) => {

            let formObject = {


                "chassisNo": null,



                "engineNo": null,



                "manufacturingYear": null,



                "countryOfOrigin": null,



                "vehicleType": null,



                "vehicleClassification": null,



                "color": null,



                "grossVehicleWeight": null,



                "emptyWeight": null,



                "state": null,



                "vehicleLicense": null,



                "salesContract": null,



                "insuranceContract": null,



                "loanContract": null,



                "dealer": null


            };




            if (result.chassisNo) {
                formObject.chassisNo = result.chassisNo;
            } else {
                formObject.chassisNo = null;
            }

            if (result.engineNo) {
                formObject.engineNo = result.engineNo;
            } else {
                formObject.engineNo = null;
            }

            if (result.manufacturingYear) {
                formObject.manufacturingYear = result.manufacturingYear;
            } else {
                formObject.manufacturingYear = null;
            }

            if (result.countryOfOrigin) {
                formObject.countryOfOrigin = result.countryOfOrigin;
            } else {
                formObject.countryOfOrigin = null;
            }

            if (result.vehicleType) {
                formObject.vehicleType = result.vehicleType;
            } else {
                formObject.vehicleType = null;
            }

            if (result.vehicleClassification) {
                formObject.vehicleClassification = result.vehicleClassification;
            } else {
                formObject.vehicleClassification = null;
            }

            if (result.color) {
                formObject.color = result.color;
            } else {
                formObject.color = null;
            }

            if (result.grossVehicleWeight) {
                formObject.grossVehicleWeight = result.grossVehicleWeight;
            } else {
                formObject.grossVehicleWeight = null;
            }

            if (result.emptyWeight) {
                formObject.emptyWeight = result.emptyWeight;
            } else {
                formObject.emptyWeight = null;
            }

            if (result.state) {
                formObject.state = result.state;
            } else {
                formObject.state = null;
            }

            if (result.vehicleLicense) {
                formObject.vehicleLicense = result.vehicleLicense;
            } else {
                formObject.vehicleLicense = null;
            }

            if (result.salesContract) {
                formObject.salesContract = result.salesContract;
            } else {
                formObject.salesContract = null;
            }

            if (result.insuranceContract) {
                formObject.insuranceContract = result.insuranceContract;
            } else {
                formObject.insuranceContract = null;
            }

            if (result.loanContract) {
                formObject.loanContract = result.loanContract;
            } else {
                formObject.loanContract = null;
            }

            if (result.dealer) {
                formObject.dealer = result.dealer;
            } else {
                formObject.dealer = null;
            }


            this.myForm.setValue(formObject);

        })

    }

    resetForm(): void {
        this.myForm.setValue({


            "chassisNo": null,



            "engineNo": null,



            "manufacturingYear": null,



            "countryOfOrigin": null,



            "vehicleType": null,



            "vehicleClassification": null,



            "color": null,



            "grossVehicleWeight": null,



            "emptyWeight": null,



            "state": null,



            "vehicleLicense": null,



            "salesContract": null,



            "insuranceContract": null,



            "loanContract": null,



            "dealer": null


        });
    }

}
