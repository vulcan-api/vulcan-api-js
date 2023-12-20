---
sidebar_position: 5
---

# Usage

First, you need to create a keystore, this is where your certificate is stored.

You will have to save it somewhere as that's what gets registered in Vulcan.

```js
const {Keystore} = require('vulcan-api-js');
const fs = require('fs');

const main = async () => {
    const keystore = new Keystore();
    await keystore.init();
    
    fs.writeFileSync("keystore.json", keystore.dumpToJsonString(), { encoding: 'utf-8' });
};

main();
```

Then you will have to register the account.

```js
const {Keystore, AccountTools, registerAccount} = require('vulcan-api-js');
const fs = require('fs');

const main = async () => {
    const keystore = new Keystore();
    keystore.loadFromJsonString(fs.readFileSync("keystore.json", { encoding: 'utf-8' }));
    
    const account = await registerAccount(keystore, {TOKEN}, {SYMBOL}, {PIN});
    fs.writeFileSync("account.json", AccountTools.dumpToJsonString(account), { encoding: 'utf-8' });
};

main();
```

When you have your keystore and account generated, you can load them and use the SDK.

```js
const {Keystore, AccountTools, VulcanHebe} = require('vulcan-api-js');

const main = async () => {
    const keystore = new Keystore();
    keystore.loadFromJsonString(fs.readFileSync("keystore.json", { encoding: 'utf-8' }));

    const client = new VulcanHebe(keystore, AccountTools.loadFromJsonString(fs.readFileSync("account.json", { encoding: 'utf-8' })));
    
    // Pick your student (defaults to the first one)
    await client.selectStudent();
    
    // You can use the SDK here
};

main();
```

:::info
All the methods in the Vulcan API JS are async.
:::