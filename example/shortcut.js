// process.env.TZ = 'Pacific/Noumea' // local timezone

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
// => 2017-01-01T01:00:00.000Z

// even simpler (from timezone is infered from date string):
console.log(timezoneShift.convert(dateInfo)) 
// => 2017-01-01T01:00:00.000Z
