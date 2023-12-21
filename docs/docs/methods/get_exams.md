---
sidebar_position: 10
---

# getExams

Gets all exams since the last sync.

## Arguments

- (lastSync?) - Date

## Returns

This method will return an array of [Exam](../models/exam) objects with all exams since the last sync.

## Example

```js
client.getExams({lastSync}).then(exams => {
    exams.forEach(exam => {
        // exams
    })
})
```