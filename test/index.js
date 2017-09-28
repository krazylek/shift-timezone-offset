var timezoneShift = require('../')
var test = require('tape')



test('a valid timezone gives an offset', function (t) {
  var tz1 = '2017-01-01T02:00:00+05:00'
  var expected1 = -300
  var tz2 = '-05:00'
  var expected2 = 300
  t.equal(timezoneShift(tz1).offset, expected1)
  t.equal(timezoneShift(tz2).offset, expected2)
  t.end()
})

test('no timezone returns local value', function (t) {
  var noTz = '2017-01-01T02:00:00'
  t.equal(timezoneShift(noTz).offset, new Date().getTimezoneOffset())
  t.end()
})


test('converting from a negative timezone', function(t) {
  var tz = '-03:00'
  var testDateStr = '2017-01-01T02:00:00-03:00'
  var expectedHours = 2
  var expectedDate = new Date('2017-01-01T02:00:00')

  var converter = timezoneShift(tz)
  var convertedDate = converter.toLocal(testDateStr)

  t.equal(converter.offset, 180)
  t.equal(convertedDate.getHours(), expectedHours)
  t.deepEqual(convertedDate, expectedDate)
  t.end()
})

test('converting from a negative timezone', function(t) {
  var tz = '+04:00'
  var testDateStr = '2017-01-01T02:00:00+04:00'
  var expectedHours = 2
  var expectedDate = new Date('2017-01-01T02:00:00')

  var converter = timezoneShift(tz)
  var convertedDate = converter.toLocal(testDateStr)

  t.equal(converter.offset, -240)
  t.equal(convertedDate.getHours(), expectedHours)
  t.deepEqual(convertedDate, expectedDate)
  t.end()
})

test('converting to a negative timezone', function(t) {
  var tz = '-03:00'
  var testDateStr = new Date('2017-01-01T02:00:00')
  var expectedDate = new Date('2017-01-01T02:00:00-03:00')

  var converter = timezoneShift(tz)

  t.deepEqual(converter.fromLocal(testDateStr), expectedDate)
  t.end()
})

test('converting to a positive timezone', function(t) {
  var tz = '+04:00'
  var testDateStr = '2017-01-01T02:00:00'
  var expectedDate = new Date('2017-01-01T02:00:00+04:00')

  var converter = timezoneShift(tz)

  t.deepEqual(converter.fromLocal(testDateStr), expectedDate)
  t.end()
})

test('converting timezone to another timezone', function(t) {
  var fromTz = '+04:00'
  var toTz = '-08:00'
  var testDateStr = '2017-01-01T02:00:00+04:00'
  var date = new Date(testDateStr)
  var expectedDate = new Date('2017-01-01T02:00:00-08:00')
  
  var converter = timezoneShift(fromTz)
  var convertedDate = converter.toTimezone(date, toTz)

  t.deepEqual(convertedDate, expectedDate)
  t.end()
})

test('converting timezone to another timezone shortcut', function(t) {
  var fromTz = '+04:00'
  var toTz = '-08:00'
  var testDateStr = '2017-01-01T02:00:00+04:00'
  var date = new Date(testDateStr)
  var expectedDate = new Date('2017-01-01T02:00:00-08:00')

  t.deepEqual(timezoneShift.convert(date, { from: fromTz, to: toTz }), expectedDate)
  t.deepEqual(timezoneShift.convert(testDateStr, { to: toTz }), expectedDate)
  t.end()
})

test('working with offset', function(t) {
  var fromTz = -240
  var testDateStr = '2017-01-01T02:00:00+04:00'
  var date = new Date(testDateStr)
  var expectedDate = new Date('2017-01-01T02:00:00')
  
  var converter = timezoneShift(fromTz)
  var convertedDate = converter.toTimezone(date)

  t.deepEqual(convertedDate, expectedDate)
  t.end()
})
