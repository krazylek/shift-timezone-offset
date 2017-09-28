// process.env.TZ = 'Pacific/Noumea' // local timezone

var timezoneOffset = require('../')
var dateInfo = '2017-01-01T00:00:00+03:00'
var initialDate = new Date(dateInfo)

console.log(initialDate.getHours())
// => 8

console.log(initialDate.getTime() / 1000)
// => 1483218000

var converter = timezoneOffset('+03:00') // timezoneOffset(dateInfo) works as well
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
