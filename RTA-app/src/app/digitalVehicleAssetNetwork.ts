// export namespace digitalVehicleAssetNetwork{
   export enum VehicleState {
      WAITING_CUSTOMS_CLEARANCE,
      FOR_SALE,
      SOLD,
      REGISTERED,
   }
   export enum Emirates {
      ABU_DHABI,
      DUBAI,
      SHARJAH,
   }
   export enum InsuranceType {
      THIRD_PARTY,
      FULL,
   }
   export enum VehicleClassification {
      SALOON,
   }
   export class Vehicle {
      chassisNo: string;
      engineNo: string;
      manufacturingYear: string;
      countryOfOrigin: string;
      vehicleType: string;
      vehicleClassification: VehicleClassification;
      color: string;
      grossVehicleWeight: number;
      emptyWeight: number;
      state: VehicleState;
      vehicleLicense: VehicleLicense;
      salesContract: SalesContract;
      insuranceContract: InsuranceContract;
      loanContract: LoanContract;
      dealer: Dealership;
   }
   export class VehicleLicense {
      eTrafficNumber: string;
      trafficPlateNo: string;
      placeOfIssue: Emirates;
      expDate: Date;
      owner: PrivateIndividual;
   }
   export class SalesContract {
      price: number;
      buyer: PrivateIndividual;
      seller: Dealership;
      vehicle: Vehicle;
   }
   export class InsuranceContract {
      policyNo: string;
      type: InsuranceType;
      price: number;
      expiryDate: Date;
      buyer: PrivateIndividual;
      insurer: Insurance;
      vehicle: Vehicle;
   }
   export class LoanContract {
      lendee: PrivateIndividual;
      lender: Bank;
      vehicle: Vehicle;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      postOfficeBox: string;
   }
   export abstract class Owner {
      email: string;
      mobileNumber: string;
      address: Address;
   }
   export class PrivateIndividual extends Owner {
      emiratesID: string;
      firstName: string;
      lastName: string;
      passportNumber: string;
      carLicenseNumber: string;
      nationality: string;
   }
   export class Dealership extends Owner {
      name: string;
      commercialLicenseNumber: string;
   }
   export abstract class Entity {
      email: string;
      name: string;
      address: Address;
   }
   export class Regulator extends Entity {
   }
   export class Customs extends Entity {
   }
   export class Bank extends Entity {
   }
   export class Insurance extends Entity {
   }
   export class clearCustoms {
      transactionID: string;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class buyVehicle {
      transactionID: string;
      price: number;
      buyer: PrivateIndividual;
      seller: Dealership;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class buyInsurance {
      transactionID: string;
      price: number;
      policyNo: string;
      type: InsuranceType;
      buyer: PrivateIndividual;
      insurer: Insurance;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class getABankLoan {
      transactionID: string;
      lendee: PrivateIndividual;
      lender: Bank;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class register {
      transactionID: string;
      trafficPlateNo: string;
      eTrafficNumber: string;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class setupDemo {
      transactionID: string;
      timestamp: Date;
   }
// }
