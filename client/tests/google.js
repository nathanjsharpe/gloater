export default {
  'Demo test Google' : browser => {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1500)
      .assert.containsText('#main', 'Night Watch')
      .end();
  }
};

