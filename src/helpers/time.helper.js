const moment = require('moment');

function getDayIdForTime(time) {
  return moment(time).day() === 0 ? 7 : moment(time).day();
}

function getFormattedTimeSlot() {
  // let nightTime = moment(date + ' ' + '17:00:00').tz(timeZone);
  // let isBusy = false;
  // if (dayTime.laundry_timeslots[0])
  //     isBusy = dayTime.laundry_timeslots[0].is_busy || !(dayTime.laundry_timeslots[0].capacity > 0);
  // return {
  //     id: dayTime.id,
  //     start: dateTime.tz(timeZone),
  //     end: dateTime.tz(timeZone).clone().add(duration, 'minutes'),
  //     is_busy: isBusy,
  //     is_night: moment(dateTime).isAfter(nightTime)
  // };
  return {};
}

function getNextSevenDays(date) {
  const currentDate = moment(date).startOf('day').utc();

  const sevenDays = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = currentDate.clone().add(i, 'days');

    sevenDays.push({
            id: nextDate.day() === 0 ? 7 : nextDate.day(),
            day: nextDate.format('dddd'),
            date: nextDate
        });
  }

  return sevenDays;
}

module.exports = {
    getFormattedTimeSlot,
    getDayIdForTime,
    getNextSevenDays
};
