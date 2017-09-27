var parseOffset = require('../parse-time-offset')
var test = require('tape')

test('timezone could be provided in different valid format', function (t) {
  var format1 = '+03:00'
  var format2 = '+0300'
  var expectedOffset1_2 = -180

  var format3 = '+11:00'
  var format4 = '+1100'
  var expectedOffset3_4 = -660

  var format5 = '-03:00'
  var format6 = '-0300'
  var expectedOffset5_6 = 180

  var format7 = '-11:00'
  var format8 = '-1100'
  var expectedOffset7_8 = 660

  t.equal(parseOffset(format1), expectedOffset1_2, 'given ' + format1)
  t.equal(parseOffset(format2), expectedOffset1_2, 'given ' + format2)
  t.equal(parseOffset(format3), expectedOffset3_4, 'given ' + format3)
  t.equal(parseOffset(format4), expectedOffset3_4, 'given ' + format4)
  t.equal(parseOffset(format5), expectedOffset5_6, 'given ' + format5)
  t.equal(parseOffset(format6), expectedOffset5_6, 'given ' + format6)
  t.equal(parseOffset(format7), expectedOffset7_8, 'given ' + format7)
  t.equal(parseOffset(format8), expectedOffset7_8, 'given ' + format8)
  t.end()
})

test('a valid ISO date with timezone should give an offset', function (t) {
  var utcISO = '2017-01-01T02:00:00Z'
  var tzISO = '2017-01-01T02:00:00-11:00'
  var tzISO2 = '2017-01-01T02:00:00+01:00'
  var expectedUtcOffset = 0
  var expectedTzOffset = 660
  var expectedTzOffset2 = -60
  t.equal(parseOffset(utcISO), expectedUtcOffset)
  t.equal(parseOffset(tzISO), expectedTzOffset)
  t.equal(parseOffset(tzISO2), expectedTzOffset2)
  t.end()
})

