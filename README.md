# timezone-offsets

Converts timezoned dates to local time or back.

Sometimes it's easier to work in local time, because all JavaScript Date objects are given in local time:

```js
new Date('2017-01-01T00:00:00Z').getHours()

// => 11 
```

It's because my timezone is +11:00, but well I would like `0`!

This library will shift a date to match time in the local timezone, as if the timezone information is ignored.


# example

```js
var timezoneOffset = require('../')
var dateInfo = '2017-01-01T00:00:00+03:00'
var initialDate = new Date(dateInfo)

initialDate.getHours()
// => 8

var converter = timezoneOffset('+03:00') // timezoneOffset(dateInfo) works as well
var localDate = converter.tzToLocal(initialDate)

localDate.getHours()
// => 0

var backToInitialDate = converter.localToTimezone(localDate)

backToInitialDate.getHours()
// => 8

initialDate.getTime() / 1000
localDate.getTime() / 1000)
backToInitialDate.getTime() / 1000

// => 1483218000
// => 1483189200
// => 1483218000
```


# api

```js
var timezoneOffset = require('timezone-offset')
```

## `var converter = timezoneOffset(validTimezone)`

### `converter.timezoneToLocal(date)`

Shift a date considered in the converter timezone to the local one. It means the UTC value is affected.
Returns a new `Date` object.

* `date` - any valid value for the `Date` constructor.

### `converter.localToTimezone(date)`

Shift a local date to converter timezone. It means the UTC value is affected.
Returns a new `Date` object.

* `date` - any valid value for the `Date` constructor.

### `converter.offset`

Get the timezone offset from UTC in minutes (similar to `Date.prototype.getTimezoneOffset`).

### `converter.timeShift`

The full shift in minutes required to convert the dates to a local time.


# license

MIT


# install

```
npm install trim-dates
```
