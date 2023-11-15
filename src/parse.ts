import dayjs, { Dayjs, isDayjs } from "dayjs";
import { DateTimePropertyType, formats } from "./index";

export const parse = (value: string | Dayjs | Date, type: DateTimePropertyType): Dayjs => {
    if (value instanceof Date) {
        return dayjs(value);
    }

    if (isDayjs(value)) {
        return value;
    }

    if (type === 'week') {
        const regex = /(\d{4})\s?w?(\d{2})/;
        const match = value.match(regex);
        if (match) {
            const year = +match[1];
            const week = +match[2];
            return dayjs().year(year).isoWeek(week).startOf('isoWeek');
        } else {
            throw new Error(`Invalid value for week: ${value}`);
        }
    } else if (type === 'quarter') {
        const regex = /(\d{4})\s?Q?(\d)/;
        const match = value.match(regex);
        if (match) {
            const year = +match[1];
            const quarter = +match[2];
            const month = quarter * 3 - 2 - 1; // -2 because we want the first month of the quarter, -1 because month is 0-indexed.
            return dayjs().year(year).month(month).startOf('month');
        } else {
            throw new Error(`Invalid value for quarter: ${value}`);
        }
    } else if (type === 'time') {
        return dayjs('1970-01-01 ' + value);
    } else {
        const STRICT = true;
        return dayjs(value, formats[type], STRICT);
    }
};
