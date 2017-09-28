# timezone-offsets

Converts timezoned dates to local time or any other timezone.

Sometimes it's easier to work in local time, because all JavaScript Date objects are given in local time:

```js
new Date('2017-01-01T00:00:00Z').getHours()

// => 11 
```

It's because my timezone is +11:00, fine, but I would like a `0`!

This library will shift a date to match time in the local timezone, or the one you need, as if the timezone information is ignored.


# example

Working in local time:

```js
// process.env.TZ = 'Pacific/Noumea' // local timezone

var timezoneShift = require('../')
var dateInfo = '2017-01-01T00:00:00+03:00'
var initialDate = new Date(dateInfo)

console.log(initialDate.getHours())
// => 8

console.log(initialDate.getTime() / 1000)
// => 1483218000

var converter = timezoneShift('+03:00') // timezoneShift(dateInfo) works as well
var localDate = converter.toLocal(initialDate)

console.log(localDate.getHours())
// => 0

console.log(localDate.getTime() / 1000)
// => 1483189200

var backToInitialDate = converter.fromLocal(localDate)

console.log(backToInitialDate.getHours())
// => 8

console.log(backToInitialDate.getTime() / 1000)
// => 1483218000
```



When only one operation is needed, there is a shortcut notation:

```js
var timezoneShift = require('../')
var dateInfo = '2017-01-01T12:00:00+03:00'

console.log(new Date(dateInfo))
// => 2017-01-01T09:00:00.000Z

// shifting 5 hours
console.log(timezoneShift.convert(dateInfo, { from: '+03:00', to: '+08:00' }))
// => 2017-01-01T04:00:00.000Z

// to local (all 3 are similar)
// local timezone is default:
console.log(timezoneShift.convert(dateInfo, { from: '+03:00' }))
// => 2017-01-01T01:00:00.000Z

// to check:
console.log(timezoneShift.convert(dateInfo, { from: '+03:00', to: '+11:00' }))
== => 2017-01-01T01:00:00.000Z

// even simpler (from timezone is infered from date string):
console.log(timezoneShift.convert(dateInfo)) 
// => 2017-01-01T01:00:00.000Z
```


# api

```js
var timezoneShift = require('timezone-offset')
```

### `var converter = timezoneShift(validTimezone)`

* `validTimezone` - valid ISO 8601 date string or timezone string: `'+05:00'`, `'-1100'` or `'2017-01-01T12:00:00+05:00'`.

### `converter.toLocal(date)`

Shift a date considered in the converter timezone to the local timezone. It means the absolute UTC value is affected.
Returns a new `Date` object.

* `date` - any valid value for the `Date` constructor.

### `converter.fromLocal(date)`

Shift a local date to the timezone. It means the UTC value is affected.
Returns a new `Date` object.

* `date` - any valid value for the `Date` constructor.

### `converter.toTimezone(date, zone)`

Shift a local date to converter timezone.
Returns a new `Date` object.

* `date` - any valid value for the `Date` constructor.
* `zone` - valid ISO 8601 date string or timezone string.

### `converter.offset`

Timezone offset from UTC in minutes (similar to `Date.prototype.getTimezoneOffset`).

### `converter.timeShift`

The full shift in minutes required to convert the dates to the local timezone.


# license

MIT


# install

```
npm install shift-timezone-offset
```
