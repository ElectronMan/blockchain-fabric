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

  it('navbar-brand should be rta-network@1.5.0',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('rta-network@1.5.0');
  });

  
    it('Vehicle component should be loadable',() => {
      page.navigateTo('/Vehicle');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Vehicle');
    });

    it('Vehicle table should have 16 columns',() => {
      page.navigateTo('/Vehicle');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(16); // Addition of 1 for 'Action' column
      });
    });

  

});
