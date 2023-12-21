---
sidebar_position: 1
---

# getStudents

Gets a list of students registered in the account.

## Returns
A list of [Student](../models/student) objects

## Example

```js
client.getStudents().then(students => {
    students.forEach(student => {
        // students
    })
})
```