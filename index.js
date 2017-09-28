var localOffset = new Date().getTimezoneOffset()
var parseOffset = require('./parse-time-offset')

module.exports = converter
module.exports.convert = function(date, zones) {
  zones = zones || {}
  return converter(zones.from || date).toTimezone(date, zones.to)
}


/**
 * Tools to convert to and from a specific timezone and the local timezone
 * @param {string|number} - a valid timezone info
 */

function converter(timezone) {
  var offset = getOffset(timezone)  
  var timeShift = offset - localOffset

  return {
    toLocal: function (date) {
      return changeTime(date, timeShift)
    },
    fromLocal: function (date) {
      return changeTime(date, -timeShift)
    },
    toTimezone: function(date, zone) {
      return changeTime(date, offset - getOffset(zone))
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

  return new Date(isNaN(date) ? date.getTime() : date - mnToMs(offset))
}

function mnToMs(mn) {
  return mn * 60 * 1000
}
