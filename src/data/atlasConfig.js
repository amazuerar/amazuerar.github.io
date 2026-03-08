/**
 * Atlas last-verified date — single source of truth.
 * Update LAST_VERIFIED when the registry is revised.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const LAST_VERIFIED = {
  year:  2026,
  month: 3,    // 1–12
  day:   8,
};

/** Original publication year — fixed, does not change when data is updated */
export const PUB_YEAR = 2026;

const monthName = MONTH_NAMES[LAST_VERIFIED.month - 1];

/** "March 7, 2026" */
export const VERIFIED_DATE_LONG = `${monthName} ${LAST_VERIFIED.day}, ${LAST_VERIFIED.year}`;

/** "March 2026" */
export const VERIFIED_DATE_MONTH = `${monthName} ${LAST_VERIFIED.year}`;
