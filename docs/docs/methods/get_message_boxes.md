---
sidebar_position: 6
---

# getMessageBoxes

Gets all message boxes.

## Returns

This method will return an array of [MessageBox](../models/message_box) objects with all message boxes.

## Example

```js
client.getMessageBoxes().then(messageBoxes => {
    messageBoxes.forEach(messageBox => {
        // messageBoxes
    })
})
```