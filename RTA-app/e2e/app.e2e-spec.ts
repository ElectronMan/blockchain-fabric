import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for RTA-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be RTA-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('RTA-app');
    })
  });

  it('navbar-brand should be rta-network@1.0.7',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('rta-network@1.0.7');
  });

  
    it('Vehicle component should be loadable',() => {
      page.navigateTo('/Vehicle');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Vehicle');
    });

    it('Vehicle table should have 11 columns',() => {
      page.navigateTo('/Vehicle');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });

  
    it('SalesContract component should be loadable',() => {
      page.navigateTo('/SalesContract');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('SalesContract');
    });

    it('SalesContract table should have 6 columns',() => {
      page.navigateTo('/SalesContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('InsuranceContract component should be loadable',() => {
      page.navigateTo('/InsuranceContract');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('InsuranceContract');
    });

    it('InsuranceContract table should have 6 columns',() => {
      page.navigateTo('/InsuranceContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('LoanContract component should be loadable',() => {
      page.navigateTo('/LoanContract');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('LoanContract');
    });

    it('LoanContract table should have 5 columns',() => {
      page.navigateTo('/LoanContract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  

});
