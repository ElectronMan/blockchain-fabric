// export namespace digitalVehicleAssetNetwork{
   export enum vehicleState {
      WAITING_CUSTOMS_CLEARANCE,
      FOR_SALE,
      SOLD,
      REGISTERED,
   }
   export class Vehicle {
      chassisNumber: string;
      make: string;
      model: string;
      licensePlate: string;
      eTrafficNumber: string;
      state: vehicleState;
      owner: Owner;
      salesContract: SalesContract;
      insuranceContract: InsuranceContract;
      loanContract: LoanContract;
   }
   export class SalesContract {
      salesID: string;
      price: number;
      buyer: Owner;
      seller: Owner;
      vehicle: Vehicle;
   }
   export class InsuranceContract {
      insuranceID: string;
      price: number;
      buyer: Owner;
      insurer: Insurance;
      vehicle: Vehicle;
   }
   export class LoanContract {
      loanID: string;
      lendee: Owner;
      lender: Bank;
      vehicle: Vehicle;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export class Owner {
      emiratesID: string;
      email: string;
      firstName: string;
      lastName: string;
      mobileNumber: string;
      address: Address;
      passportNumber: string;
      licenseNumber: string;
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
      buyer: Owner;
      seller: Owner;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class buyInsurance {
      transactionID: string;
      price: number;
      buyer: Owner;
      insurer: Insurance;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class getABankLoan {
      transactionID: string;
      lendee: Owner;
      lender: Bank;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class register {
      transactionID: string;
      licensePlate: string;
      eTrafficNumber: string;
      vehicle: Vehicle;
      timestamp: Date;
   }
   export class setupDemo {
      transactionID: string;
      timestamp: Date;
   }
// }
