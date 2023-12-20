---
sidebar_position: 3
---

# getLessons

Gets a list of lessons.

## Arguments
- (dateFrom?) - Date
- (dateTo?) - Date

If the dates aren't provided defaults to today.

## Returns

An array of [Lesson](../models/Lesson) objects

## Example

```js
client.getLessons({dateFrom?}, {dateTo?}).then(lessons => {
    lessons.forEach(lesson => {
        // lessons
    })
})
```