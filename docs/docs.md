# Docs - vulcan-api-js

## Usage

First you need to create a certificate

```js
import { getCertificate } from './vulcan/certificate.js';

getCertificate("{token}", "{symbol}", "{pin}).then(cert => {
  // Do something with the certificate
  // You probably want to save it to a file
});

```
Then you will have to set the student
```js
import { Vulcan } from './vulcan/vulcan.js';

let vulcan = new Vulcan({"Your certificate"});

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