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
    // Create the sales contract asset.
    var salesContract = factory.newResource('digitalVehicleAssetNetwork', 'SalesContract', 'SALE_001');
    salesContract.price = buyVehicle.price;
    salesContract.vehicle = buyVehicle.vehicle;
    salesContract.buyer = buyVehicle.buyer;
    salesContract.seller = buyVehicle.seller;
    vehicle.salesContract = salesContract;
    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(vehicleRegistry) {
            // save the updated vehicle
            return vehicleRegistry.update(vehicle);
        })
        .then(function() {
            return getAssetRegistry('digitalVehicleAssetNetwork.SalesContract');
        })
        .then(function(salesContractRegistry) {
            // add the sales contract to the registry
            return salesContractRegistry.add(salesContract);
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
    // Create the insurance contract asset.
    var insuranceContract = factory.newResource('digitalVehicleAssetNetwork', 'InsuranceContract', 'INSURANCE_001');
    insuranceContract.price = buyInsurance.price;
    insuranceContract.vehicle = vehicle;
    insuranceContract.owner = buyInsurance.owner;
    insuranceContract.insurer = buyInsurance.insurer;
    vehicle.insuranceContract = insuranceContract;
    return getAssetRegistry('digitalVehicleAssetNetwork.Vehicle')
        .then(function(vehicleRegistry) {
            // save the vehicle
            return vehicleRegistry.update(vehicle);
        })
        .then(function() {
            return getAssetRegistry('digitalVehicleAssetNetwork.InsuranceContract');
        })
        .then(function(insuranceContractRegistry) {
            // add the sales contract to the registry
            return insuranceContractRegistry.add(insuranceContract);
        });
}
/**
 * Process a vehicle that is held for sale
 * @param {digitalVehicleAssetNetwork.register} register the vehicle to be sold
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
    let buyer = factory.newResource(NS, 'Owner', '111111111111111');
    let buyerAddress = factory.newConcept(NS, 'Address');
    buyerAddress.country = 'United Arab Emirates';
    buyer.email = 'buyer@email.com';
    buyer.firstName = 'Buyer';
    buyer.lastName = 'Buyer';
    buyer.mobileNumber = '971551111111';
    buyer.address = buyerAddress;
    buyer.passportNumber = '22222';
    buyer.licenseNumber = '333333';

    // create the Seller
    let seller = factory.newResource(NS, 'Owner', '222222222222222');
    let sellerAddress = factory.newConcept(NS, 'Address');
    sellerAddress.country = 'United Arab Emirates';
    seller.email = 'seller@email.com';
    seller.firstName = 'Seller';
    seller.lastName = 'Seller';
    seller.mobileNumber = '971552222222';
    seller.address = sellerAddress;
    seller.passportNumber = '333333';
    seller.licenseNumber = '444444';

    // create the regulator
    let regulator = factory.newResource(NS, 'Regulator', 'rta@email.com');
    let regulatorAddress = factory.newConcept(NS, 'Address');
    regulatorAddress.country = 'United Arab Emirates';
    regulator.address = regulatorAddress;
    regulator.name = 'RTA';

    // create the customs
    let customs = factory.newResource(NS, 'Customs', 'dubaiports@email.com');
    let customsAddress = factory.newConcept(NS, 'Address');
    customsAddress.country = 'United Arab Emirates';
    customs.address = customsAddress;
    customs.name = 'Dubai Ports';

    // create the bank
    let bank = factory.newResource(NS, 'Bank', 'HSBC@email.com');
    let bankAddress = factory.newConcept(NS, 'Address');
    bankAddress.country = 'United Arab Emirates';
    bank.address = bankAddress;
    bank.name = 'HSBC';

    // create the insurace
    let insurance = factory.newResource(NS, 'Insurance', 'hilal@email.com');
    let insuranceAddress = factory.newConcept(NS, 'Address');
    insuranceAddress.country = 'United Arab Emirates';
    insurance.address = insuranceAddress;
    insurance.name = 'Hilal';

    // create the vehicle
    let vehicle = factory.newResource(NS, 'Vehicle', '123456789123456');
    vehicle.owner = factory.newRelationship(NS, 'Owner', '222222222222222');
    vehicle.make = 'Toyota';
    vehicle.model = 'Yaris';
    vehicle.state = 'WAITING_CUSTOMS_CLEARANCE';

    return getParticipantRegistry(NS + '.Owner')
        .then(function(ownerRegistry) {
            // add the growers
            return ownerRegistry.addAll([seller, buyer]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Regulator');
        })
        .then(function(regulatorRegistry) {
            // add the importers
            return regulatorRegistry.addAll([regulator]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Customs');
        })
        .then(function(customsRegistry) {
            // add the shippers
            return customsRegistry.addAll([customs]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Bank');
        })
        .then(function(bankRegistry) {
            // add the contracts
            return bankRegistry.addAll([bank]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Insurance');
        })
        .then(function(insuranceRegistry) {
            // add the shipments
            return insuranceRegistry.addAll([insurance]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Vehicle');
        })
        .then(function(vehicleRegistry) {
            // add the shipments
            return vehicleRegistry.addAll([vehicle]);
        });
}
