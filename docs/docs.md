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

First you need to create a certificate

```js
const Vulcan = require('vulcan-api-js');

Vulcan.getCertificate("{token}", "{symbol}", "{pin}").then(cert => {
  // Do something with the certificate
  // You probably want to save it to a file
});

```
Then you will have to set the student
```js
const Vulcan = require('vulcan-api-js');

let vulcan = new Vulcan.Vulcan({"Your certificate"});

vulcan.getStudents().then(students => {
    students.map(student => {
        if (student["Imie"] === "Jan"){
            vulcan.setStudent(student).then(() => {
                // Here the student is set
                // And you can start using the vulcan-api
            });
        }
    });
});
```
## Available methods:
- getStudents()
- setStudent(student)
- getGrades()
- getLessons(date) - date is not required
- getExams(date) - date is not required
- getHomework(date) - date is not required
- getMessages(dateFrom, dateTo) - dateFrom and dateTo are not required
### All the methods in vulcan-api-js return a promise!

## Development

### Running tests

The tests are running in a live environment so you will have to supply your certificate in the .env file.

#### YARN
```
yarn test
```

#### NPM
```
npm run test
```

### Contributing

Honestly, any contribution would be welcome 😉