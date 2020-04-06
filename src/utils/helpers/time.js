// Dependencies
import React from 'react';
import invoke from 'lodash/invoke';

export const convertTime = (hours, minutes) => {
  let suffix = 'am';
  if (hours > 11) {
    suffix = 'pm';
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  let prefixMinutes = '';
  if (minutes < 10) {
    prefixMinutes = '0';
  }
  return `${hours}:${prefixMinutes}${minutes}${suffix}`;
};

export const convertWeekday = (day) => {
  switch (day) {
    case 0: {
      return 'Sun';
    }
    case 1: {
      return 'Mon';
    }
    case 2: {
      return 'Tues';
    }
    case 3: {
      return 'Wed';
    }
    case 4: {
      return 'Thur';
    }
    case 5: {
      return 'Fri';
    }
    case 6: {
      return 'Sat';
    }
    default: {
      return '';
    }
  }
};

export const convertMonthAbbrev = (month) => {
  switch (month) {
    case 0: {
      return 'Jan';
    }
    case 1: {
      return 'Feb';
    }
    case 2: {
      return 'Mar';
    }
    case 3: {
      return 'Apr';
    }
    case 4: {
      return 'May';
    }
    case 5: {
      return 'Jun';
    }
    case 6: {
      return 'Jul';
    }
    case 7: {
      return 'Aug';
    }
    case 8: {
      return 'Sep';
    }
    case 9: {
      return 'Oct';
    }
    case 10: {
      return 'Nov';
    }
    case 11: {
      return 'Dec';
    }
    default: {
      return '';
    }
  }
};

export const convertDaySuffix = (day) => {
  if (day === 11) {
    return `${day}th`;
  }
  if (day === 12) {
    return `${day}th`;
  }
  if (day === 13) {
    return `${day}th`;
  }
  if (day % 10 === 1) {
    return `${day}st`;
  }
  if (day % 10 === 2) {
    return `${day}nd`;
  }
  if (day % 10 === 3) {
    return `${day}rd`;
  }
  return `${day}th`;
};

/*
  options: {
    excludeDate: Bool,
    excludeMonth: Bool,
    excludeWeekday: Bool,
    includeClasses: Bool,
    includeCurrentYear: Bool,
    includeTime: Bool,
  }
*/
export const formatDateBlock = (date, options = {}) => {
  // Escape early if nothing was provided.
  if (!date) {
    return '';
  }

  // Derive if the date provided is a valid date.
  const isValidDate = date instanceof Date;

  // Escape early if it is not.
  if (!isValidDate) {
    return '';
  }

  // Derive weekday.
  const weekday = options.excludeWeekday ? '' : convertWeekday(date.getDay());

  // Derive month.
  const month = options.excludeMonth ? '' : ` ${convertMonthAbbrev(date.getMonth())}`;

  // Derive date (ie. Sept "17")
  const formattedDate = options.excludeDate ? '' : ` ${date.getDate()}`;

  // Derive year.
  const currentYear = new Date().getFullYear();
  const providedYear = date.getFullYear();
  let year = '';

  // Show the year if it's not the current one.
  if (currentYear !== providedYear) {
    year = `, ${providedYear}`;
  }

  // Include the current year if they want it.
  if (options.includeCurrentYear) {
    year = `, ${currentYear}`;
  }

  // Derive time.
  const time = options.includeTime ? ` at ${convertTime(date.getHours(), date.getMinutes())}` : '';

  // Return back JSX if they want classes.
  if (options.includeClasses) {
    return (
      <div className="date-block">
        <span className="weekday">{weekday}</span>
        <span className="month">{month}</span>
        <span className="formatted-date">{formattedDate}</span>
        <span className="year">{year}</span>
        <span className="time">{time}</span>
      </div>
    );
  }

  // Format our date to a date block format.
  return `${weekday}${month}${formattedDate}${year}${time}`;
};

export const sameDay = (d1, d2) =>
  invoke(d1, 'getFullYear') === invoke(d2, 'getFullYear') &&
  invoke(d1, 'getMonth') === invoke(d2, 'getMonth') &&
  invoke(d1, 'getDate') === invoke(d2, 'getDate');

export const isPastOrToday = (date) => {
  const now = new Date();

  // Is date in the past.
  if (date.getTime() <= now.getTime()) {
    return true;
  }

  // Is date at some point today.
  if (sameDay(date, now)) {
    return true;
  }

  // Date is in the future (beyond today).
  return false;
};

export const deriveTimestamp = (createdAtMS = 0, updatedAtMS = 0) => {
  // Return updatedAt when it's the latest timestamp.
  if (updatedAtMS > createdAtMS) {
    return `Last updated ${formatDateBlock(new Date(updatedAtMS), {
      excludeWeekday: true,
      includeTime: true,
    })}`;
  }

  // Return createdAt when it's the same or greater than updatedAt.
  return `Created ${formatDateBlock(new Date(createdAtMS), {
    excludeWeekday: true,
    includeTime: true,
  })}`;
};
