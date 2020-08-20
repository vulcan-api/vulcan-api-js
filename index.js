import { Vulcan } from './vulcan/vulcan.js';

let vulcan = new Vulcan("cert"); // replace cert with certificate obj

vulcan.getStudents().then(students => {
    console.log(students);
});