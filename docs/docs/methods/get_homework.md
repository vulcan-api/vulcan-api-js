---
sidebar_position: 8
---

# getHomework

Gets all homework.

## Returns

This method will return an array of [Homework](../models/homework) objects with all homework.

## Example

```js
client.getHomework().then(homework => {
    homework.forEach(homework => {
        // homework
    })
})
```