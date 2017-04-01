/*jslint node: true */

'use strict';

/**
 * clear customs for a vehicle
 * @param {digitalVehicleAssetNetwork.clearCustoms} clearCustoms - the clearing customs transaction
 * @transaction
 */
function onClearCustoms(clearCustoms) {
    console.log('### onClearCustoms ' + clearCustoms.toString());
    var vehicle = clearCustoms.vehicle;
    if (vehicle.state !== 'WAITING_CUSTOMS_CLEARANCE') {
        throw new Error('Vehicle has already cleared customs: ' + vehicle.state);
    }
    vehicle.state = 'FOR_SALE';

    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(vehicleRegistry) {
            // save the vehicle
            return vehicleRegistry.update(vehicle);
        });
}

/**
 * Initiate a sales agreement for buying a car
 * @param {digitalVehicleAssetNetwork.buyVehicle} buyVehicle
 * @transaction
 */
function onBuyVehicle(buyVehicle) {
    var vehicle = buyVehicle.vehicle;
    if (vehicle.state !== 'FOR_SALE') {
        throw new Error('Vehicle is not FOR SALE: ' + vehicle.state);
    }
    vehicle.state = 'SOLD';
    var factory = getFactory();
    // Create the sales contract concept
    var salesContract = factory.newConcept('digitalVehicleAssetNetwork', 'SalesContract');
    salesContract.price = buyVehicle.price;
    salesContract.vehicle = vehicle;
    salesContract.buyer = buyVehicle.buyer;
    salesContract.seller = buyVehicle.seller;
    vehicle.salesContract = salesContract;
    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(vehicleRegistry) {
            // save the updated vehicle
            return vehicleRegistry.update(vehicle);
        });
}

/**
 * Buy Insurance for a vehicle
 * @param {digitalVehicleAssetNetwork.buyInsurance} buyInsurance
 * @transaction
 */
function onBuyInsurance(buyInsurance) {
    console.log('### onBuyInsurance ' + buyInsurance.toString());
    var vehicle = buyInsurance.vehicle;
    if (vehicle.state !== 'SOLD') {
        throw new Error('Vehicle not SOLD: ' + vehicle.state);
    }
    var factory = getFactory();
    // Create the insurance contract concept.
    var insuranceContract = factory.newConcept('digitalVehicleAssetNetwork', 'InsuranceContract');
    insuranceContract.price = buyInsurance.price;
    insuranceContract.vehicle = vehicle;
    insuranceContract.buyer = buyInsurance.buyer;
    insuranceContract.insurer = buyInsurance.insurer;
    vehicle.insuranceContract = insuranceContract;
    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(vehicleRegistry) {
            // save the vehicle
            return vehicleRegistry.update(vehicle);
        });
}

/**
 * Get a car loan from bank
 * @param {digitalVehicleAssetNetwork.getABankLoan} getABankLoan
 * @transaction
 */
function onGetABankLoan(getABankLoan) {
    console.log('### onGetABankLoan ' + getABankLoan.toString());
    var vehicle = getABankLoan.vehicle;
    if (vehicle.state !== 'SOLD') {
        throw new Error('Vehicle not SOLD: ' + vehicle.state);
    }
    var factory = getFactory();
    // Create the loan contract concept
    var loanContract = factory.newConcept('digitalVehicleAssetNetwork', 'LoanContract');
    loanContract.vehicle = vehicle;
    loanContract.lendee = getABankLoan.lendee;
    loanContract.lender = getABankLoan.lender;
    vehicle.loanContract = loanContract;
    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(vehicleRegistry) {
            // save the vehicle
            return vehicleRegistry.update(vehicle);
        });
}

/**
 * Register a vehicle with the RTA
 * @param {digitalVehicleAssetNetwork.register} register the vehicle to be registered
 * @transaction
 */
function onRegister(register) {
    console.log('### onTransfer ' + register.toString());
    var vehicle = register.vehicle;
    if (vehicle.state !== 'SOLD') {
        throw new Error('Vehicle is not SOLD: ' + vehicle.state);
    }
    vehicle.state = 'REGISTERED';
    vehicle.owner = vehicle.salesContract.buyer;
    vehicle.licensePlate = register.licensePlate;
    vehicle.eTrafficNumber = register.eTrafficNumber;

    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(result) {
            return result.update(register.vehicle);
        });
}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {digitalVehicleAssetNetwork.setupDemo} setupDemo - the setupDemo transaction
 * @transaction
 */
function setupDemo(setupDemo) {
    let factory = getFactory();
    let NS = 'digitalVehicleAssetNetwork';

    // create the Buyer
    let buyer = factory.newResource(NS, 'PrivateIndividual', '111111111111111');
    let buyerAddress = factory.newConcept(NS, 'Address');
    buyerAddress.country = 'United Arab Emirates';
    buyerAddress.city = 'Dubai';
    buyer.email = 'hussam.blockhain@gmail.com';
    buyer.firstName = 'Hussam';
    buyer.lastName = 'Blockhain';
    buyer.mobileNumber = '971551111111';
    buyer.address = buyerAddress;
    buyer.passportNumber = '22222';
    buyer.carLicenseNumber = '333333';

    // create the Dealer
    let dealer = factory.newResource(NS, 'Dealership', '444444');
    let dealerAddress = factory.newConcept(NS, 'Address');
    dealerAddress.country = 'United Arab Emirates';
    dealerAddress.city = 'Dubai';
    dealerAddress.street = 'Sheikh Zayed Road between Interchange 2 and 3 next to Noor Islamic Bank Metro Station';
    dealerAddress.postOfficeBox = '10773';
    dealer.name = 'Al Nabooda Automobiles';
    dealer.mobileNumber = '97147053333';
    dealer.address = dealerAddress;

    // create the regulator
    let regulator = factory.newResource(NS, 'Regulator', 'rta@email.com');
    let regulatorAddress = factory.newConcept(NS, 'Address');
    regulatorAddress.country = 'United Arab Emirates';
    regulatorAddress.city = 'Dubai';
    regulator.address = regulatorAddress;
    regulator.name = 'RTA';

    // create the customs
    let customs = factory.newResource(NS, 'Customs', 'dubaiports@email.com');
    let customsAddress = factory.newConcept(NS, 'Address');
    customsAddress.country = 'United Arab Emirates';
    customsAddress.city = 'Dubai';
    customs.address = customsAddress;
    customs.name = 'Dubai Ports';

    // create the bank
    let bank = factory.newResource(NS, 'Bank', 'HSBC@email.com');
    let bankAddress = factory.newConcept(NS, 'Address');
    bankAddress.country = 'United Arab Emirates';
    bankAddress.city = 'Dubai';
    bank.address = bankAddress;
    bank.name = 'HSBC';

    // create the insurance
    let insurance = factory.newResource(NS, 'Insurance', 'hilal@email.com');
    let insuranceAddress = factory.newConcept(NS, 'Address');
    insuranceAddress.country = 'United Arab Emirates';
    insuranceAddress.city = 'Dubai';
    insurance.address = insuranceAddress;
    insurance.name = 'Hilal';

    // create the vehicle
    let vehicle = factory.newResource(NS, 'Vehicle', '123456789123456');
    vehicle.dealer = factory.newRelationship(NS, 'Dealership', '444444');
    vehicle.make = 'Toyota';
    vehicle.model = 'Yaris';
    vehicle.state = 'WAITING_CUSTOMS_CLEARANCE';

    return getParticipantRegistry(NS + '.PrivateIndividual')
        .then(function(privateIndividualRegistry) {
            // add the private individuals (buyers)
            return privateIndividualRegistry.addAll([buyer]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Dealership');
        })
        .then(function(dealershipRegistry) {
            // add the dealerships
            return dealershipRegistry.addAll([dealer]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Regulator');
        })
        .then(function(regulatorRegistry) {
            // add the regulators
            return regulatorRegistry.addAll([regulator]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Customs');
        })
        .then(function(customsRegistry) {
            // add the customs
            return customsRegistry.addAll([customs]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Bank');
        })
        .then(function(bankRegistry) {
            // add the banks
            return bankRegistry.addAll([bank]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Insurance');
        })
        .then(function(insuranceRegistry) {
            // add the insurers
            return insuranceRegistry.addAll([insurance]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Vehicle');
        })
        .then(function(vehicleRegistry) {
            // add the vehicles
            return vehicleRegistry.addAll([vehicle]);
        });
}
