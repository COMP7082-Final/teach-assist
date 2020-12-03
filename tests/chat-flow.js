module.exports = {
    "get to login page": browser => {
        browser.url(browser.launchUrl);
        browser.assert.urlContains("login");
    },
    "get to sign up page from login page": browser => {
        browser.click('a[href="/signup"]');
        browser.assert.urlContains("signup");
    },
    "get to login page from sign up page": browser => {
        browser.click('a[href="/login"]');
        browser.assert.urlContains("login");
    },
    "logging in": browser => {
        browser
            // set the input email to a valid username / password
            .setValue("input[type=email]", "jason@chat.ca")
            .setValue("input[type=password]", "hello@123")
            // submit the form
            .click("button[type=submit]")
            // Get the text of the h1 tag
            .getText(".home h1", function(comp) {
                this.assert.equal(comp.value, "Welcome to Teach-Assist");
            });

        browser.assert.urlContains(browser.launchUrl);
    },
    "get to classroom page": browser => {
        browser.click('a[href="/classlist"]');
        browser.click('a[href="/classroom/MATH8056"]')
            .getText(".row  h1", function(comp) {
                this.assert.equal(comp.value, "THIS IS CLASS: MATH8056");
            });
    },
    "verify chat dialogue": browser => {
        browser
            .setValue('.chat-input textarea','hello')
            .click("button[type=submit]")
            .assert.containsText(".chat-area", "hello");
    },
    close: browser => {}
};