module.exports = {
    "get to login page": browser => {
        browser
            // Load the page at the launch URL
            .url(browser.launchUrl)
            // wait for page to load
            //.waitForElementVisible(".navbar", 1000)
            // click on the login link
            //.click('a[href="/login"]');

        browser.assert.urlContains("login");
    },
    "create_user": browser => {
        browser
        .click('a[href="/signup"]')
        .setValue("input[name=email]", "testuserr333333@test.com")
        .setValue("select[id=role]", "1")
        .setValue("input[name=fname]", "test")
        .setValue("input[name=lname]", "test")
        .setValue("input[name=password]", "testtesttest")

        .click("button[type=submit]")
    },

    "logging in_created_user": browser => {
        browser
            .getText(".home h1", function(comp) {
            this.assert.equal(comp.value, "Welcome to Teach-Assist");
            });
  
        browser.assert.urlContains(browser.launchUrl);
    },

    "logging out": browser => {
        browser
        .click('a[href="/"]')
    },

    "logging in": browser => {
        browser
            // set the input email to a valid username / password
            .setValue("input[type=email]", "test@takashi.com")
            .setValue("input[type=password]", "testtakashi")
            // submit the form
            .click("button[type=submit]")
            // wait for the page to load
            .waitForElementVisible(".home", 1000)
            // Get the text of the h1 tag
            .getText(".home h1", function(comp) {
            this.assert.equal(comp.value, "Welcome to Teach-Assist");
            });
  
        browser.assert.urlContains(browser.launchUrl);
    },
    "display classlist": browser => {
        browser.assert.urlContains(browser.launchUrl);

        browser
        .click('a[href="/classlist"]')

        .getText(".classlist_container h1", function(comp) {
            this.assert.equal(comp.value, "Class List");
        });
    },

    "create_class" : browser => {
        browser
        .click(".classlist_container button")

        .setValue("input[name=c_name]", "Test Class")
        .setValue("input[name=c_code]", "COMP")
        .setValue("input[name=c_num]", "10000")

        //add submit for final
        .click("#m_sub")

        .getText(".classlist_container h1", function(comp) {
            this.assert.equal(comp.value, "Class List");
        });
    },

    "enter_classroom" : browser => {
        browser

        .waitForElementVisible(".classlist_container", 1000)

        .getText(".classlist_container h1", function(comp) {
            this.assert.equal(comp.value, "Class List");
        })

        .getText("#MATH8056 h1", function(comp) {
            this.assert.equal(comp.value, "MATH 8056");
        })

        .click('a[href="/classroom/MATH8056"]')

        .getText("#test", function(comp) {
            this.assert.equal(comp.value, "THIS IS CLASS: MATH8056");
        })
    },

    close: browser => {}
  };