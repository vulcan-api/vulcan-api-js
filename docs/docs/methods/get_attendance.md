---
sidebar_position: 9
---

# getAttendance

Gets attendace from a date range.

## Arguments

- (from) - [DateTime](../models/date_time)
- (to) - [DateTime](../models/date_time)

## Returns

This method will return an array of [Attendance](../models/attendance) objects with all attendance from the date range.

## Example

```js
client.getAttendance({from, to}).then(attendance => {
    attendance.forEach(attendance => {
        // attendance
    })
})
```