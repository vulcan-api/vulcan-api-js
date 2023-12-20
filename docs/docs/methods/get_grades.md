---
sidebar_position: 5
---

# getGrades

Gets all grades since the last sync.

## Arguments
- (lastSync?) - Date

## Returns

This method will return an array of [Grade](../models/grade) objects with all grades since the last sync.

## Example

```js
client.getGrades({lastSync}).then(grades => {
    grades.forEach(grade => {
        // grades
    })
})
```