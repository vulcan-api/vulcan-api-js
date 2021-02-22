# Docs - vulcan-api-js

## Installation

#### YARN
```
yarn add vulcan-api-js
```

#### NPM
```
npm install vulcan-api-js --save
```

## Usage

First you need to create a keystore, this is where you certificate is stored.

You will have to save it somewhere as that's what gets registered in vulcan.

```js
const {keystore} = require('vulcan-api-js');

const keystore = new Keystore();

keystore.init(() => {
    const keystoreDump = keystore.dump();
    const keystoreString = JSON.stringify(keystoreDump);
    // Save it somewhere
})

```
Then you will have to register the account.
```js
const {keystore, registerAccount} = require('vulcan-api-js');

const keystore = new Keystore();

keystore.load({YOUR-KEYSTORE});

registerAccount(keystore, {TOKEN}, {SYMBOL}, {PIN}).then(account => {
    const accountString = JSON.stringify(account);
    // You have to save this as well
});
```

When you have your keystore and account generated, you can load them and use the SDK.

```js
const {keystore, VulcanHebe} = require('vulcan-api-js');

const keystore = new Keystore();

keystore.load({YOUR-KEYSTORE});

const client = new VulcanHebe(keystore, account);

// Pick your student (defaults to the first one)
client.selectStudent().then(() => {
    // You can use the SDK here
})

```


## Available methods:
- getStudents()
- selectStudent(student)
- getLessons(dateFrom: Date, dateTo: Date) - date is not required
- getLuckyNumber()
### All the methods in vulcan-api-js return a promise.

### Contributing

Honestly, any contribution would be welcome 😉