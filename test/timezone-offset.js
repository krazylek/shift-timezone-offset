var timezoneOffset = require('../')
var test = require('tape')

test('a valid timezone gives an offset', function (t) {
  var tz1 = '2017-01-01T02:00:00+05:00'
  var expected1 = -300
  var tz2 = '-05:00'
  var expected2 = 300
  t.equal(timezoneOffset(tz1).offset, expected1)
  t.equal(timezoneOffset(tz2).offset, expected2)
  t.end()
})

test('no timezone returns local value', function (t) {
  var noTz = '2017-01-01T02:00:00'
  t.equal(timezoneOffset(noTz).offset, new Date().getTimezoneOffset())
  t.end()
})


test('converting from a negative timezone', function(t) {
  var tz = '-03:00'
  var testDateStr = '2017-01-01T02:00:00-03:00'
  var expectedHours = 2
  var expectedDate = new Date('2017-01-01T02:00:00')

  var converter = timezoneOffset(tz)
  var convertedDate = converter.timezoneToLocal(testDateStr)

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

  var converter = timezoneOffset(tz)
  var convertedDate = converter.timezoneToLocal(testDateStr)

  t.equal(converter.offset, -240)
  t.equal(convertedDate.getHours(), expectedHours)
  t.deepEqual(convertedDate, expectedDate)
  t.end()
})

test('converting to a negative timezone', function(t) {
  var tz = '-03:00'
  var testDateStr = new Date('2017-01-01T02:00:00')
  var expectedDate = new Date('2017-01-01T02:00:00-03:00')

  var converter = timezoneOffset(tz)

  t.deepEqual(converter.localToTimezone(testDateStr), expectedDate)
  t.end()
})

test('converting to a negative timezone', function(t) {
  var tz = '+04:00'
  var testDateStr = '2017-01-01T02:00:00'
  var expectedDate = new Date('2017-01-01T02:00:00+04:00')

  var converter = timezoneOffset(tz)

  t.deepEqual(converter.localToTimezone(testDateStr), expectedDate)
  t.end()
})
