var localOffset = new Date().getTimezoneOffset()
var parseOffset = require('./parse-time-offset')


module.exports = converter
//module.exports.toLocal = toLocal
//module.exports.toTimezone = toTimezone


/**
 * @param {Date|string|number} - date as Date object, or ISO date string, or timestamp
 * @param {string|Number} - optional zone info
 */

module.exports.toLocal = function(date, zone) {
  zone = zone || date
  var offset = getOffset(zone) - localOffset
  return changeTime(date, offset)
}

module.exports.toTimezone = function(date, zone) {
  var initialOffset = getOffset(date) || 0
  var offset = getOffset(zone) + initialOffset - localOffset
  var dateObj = typeof date == 'string' ? new Date(date) : date 
  return changeTime(dateObj, offset)
}
  
function converter(timezone) {
  var offset = getOffset(timezone)  
  var timeShift = offset - localOffset

  return {
    timezoneToLocal: function (date) {
      return changeTime(date, timeShift)
    },
    localToTimezone: function (date) {
      return changeTime(date, -timeShift)
    },
    offset: offset,
    timeShift: timeShift
  }
}



function getOffset(timezoneData, defaultOffset) {
  defaultOffset = isNaN(defaultOffset) ? localOffset : defaultOffset
  
  if(typeof timezoneData == 'string') {
    var offset = parseOffset(timezoneData)
    return offset !== null ? offset : defaultOffset  
  }

  if(typeof timezoneData == 'number')
    return timezoneData
  
  return defaultOffset
}

/**
 * @param {Date|string|number} - date as Date object, or ISO date string, or timestamp
 * @param {number} - integer offset in minutes to slide the date
 */

function changeTime(date, offset) {
  if(typeof date == 'string')
    date = new Date(date)

  return new Date(isNaN(date) ? date.getTime() : date - toMs(offset))
}

/**
 * minutes to milliseconds
 */

function toMs(mn) {
  return mn * 60 * 1000
}
