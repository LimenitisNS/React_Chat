const user = {
    nickname: "user-nightwatch" + new Date().getTime(),
    password: "12345678"
};
const chat = {
    title: "nightwatch" + new Date().getTime(),
}

const message = {
    content: "nightwatch"
}

module.exports = {
    "Main page is showing" : function (browser) {
        browser
            .url("http://localhost:3000/")
            .waitForElementVisible("body")
            .assert.visible("body")
            .end();
    },
    "The user can register and login" : function (browser) {
        browser
            .url("http://localhost:3000/")
            .waitForElementVisible("body")
            .click("a[href='/registration']")
            .setValue("input[name='nickname']", user.nickname)
            .setValue("input[name='password']", user.password)
            .submitForm("form")
            .waitForElementVisible("div.result")
            .assert.containsText("div.result", "User successfully registered")
            .waitForElementVisible("div.loginForm")
            .setValue("input[name='nickname']", user.nickname)
            .setValue("input[name='password']", user.password)
            .submitForm("form")
            .waitForElementVisible("div.result")
            .assert.containsText("div.result", "The user has successfully logged in")
            .end();
    },
    "The user entered an incorrect password during registration" : function (browser) {
        browser
            .url("http://localhost:3000/")
            .waitForElementVisible("body")
            .click("a[href='/registration']")
            .waitForElementVisible("div.registrationForm")
            .setValue("input[name='nickname']", user.nickname)
            .setValue("input[name='password']", user.password.substring(0, 5))
            .submitForm("form")
            .waitForElementVisible("div[id='errorPassword']")
            .assert.containsText("div[id='errorPassword", "The password must be longer than 6 characters")
            .end();
    },
    "The user can login and send a message" : function (browser) {
        browser
            .url("http://localhost:3000/")
            .waitForElementVisible("body")
            .setValue("input[name='nickname']", user.nickname)
            .setValue("input[name='password']", user.password)
            .submitForm("form")
            .waitForElementVisible("div.chatForm")
            .setValue("input[name='chat']", chat.title)
            .submitForm("form")
            .useXpath()
            .click(`//*[contains(text(), '${chat.title}')]`)
            .useCss()
            .waitForElementVisible("div.chatView")
            .setValue("input[name='content']", message.content)
            .submitForm("form")
            .assert.containsText('ul.message', message.content)
            .end();
    }
};