import dayjs, { Dayjs } from 'dayjs';
import { parse } from './parse';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

export const formats: {
    [key in DateTimePropertyType]: string;
} = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm',
    year: 'YYYY',
    quarter: 'YYYY [Q]Q',
    month: 'YYYY-MM',
    week: 'YYYY [w]WW',
};

export class PartialDate {
    private type: DateTimePropertyType;
    private value: Dayjs;

    constructor(value: string | Dayjs | Date, type: DateTimePropertyType) {
        this.type = type;
        this.value = parse(value, type);
    }

    public toString(): string {
        return this.value.format(formats[this.type]);
    }

    public toDate(): Date {
        return this.value.toDate();
    }
}

// This really ought to be imported from lime-web-components, but lime-web-components isn't public yet.
export type DateTimePropertyType = 'time' | 'date' | 'year' | 'quarter' | 'month' | 'week';
