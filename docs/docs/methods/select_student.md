---
sidebar_position: 2
---

# selectStudent

Sets the student that you want to use to access the API.

## Arguments
- (student?) - [Student](../models/student)

If a student is not provided the first one gets selected.

## Example

```js
client.selectStudent({student?}).then(() => {
    // Do something
})
```