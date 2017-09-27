module.exports = parseOffset

/**
 * extract the timezone offset information from a valid ISO 8601 date or any timezone string
 * Note that it is inverted from the timezone information: `+01:00` will give `-60`
 * @returns {number} minutes from UTC
 */

function parseOffset(timeStr) {
  if(typeof timeStr != 'string') 
    return null

  if(timeStr.match(/Z/))
    return 0
  
  var timezone = timeStr.match(/[\+−-]\d{2}:?\d{2}$/)
  return timezone ? timezoneToOffset(timezone[0]) : null
}

function timezoneToOffset(timezone) {
  var pos = timezone.match(/\+/) ? -1 : 1
  var timeInfo = timezone.match(/\d{2}/g)
  return (parseInt(timeInfo[0]) * 60 + parseInt(timeInfo[1] || 0)) * pos
}
