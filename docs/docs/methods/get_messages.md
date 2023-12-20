---
sidebar_position: 7
---

# getMessages

Gets all messages.

## Arguments
- (messageBox) - [MessageBox](../models/message_box)

## Returns

This method will return an array of [Message](../models/message) objects with all messages in the message box.

## Example

```js
client.getMessages({messageBox}).then(messages => {
    messages.forEach(message => {
        // messages
    })
})
```