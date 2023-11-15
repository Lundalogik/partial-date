import { expect } from 'chai';
import { parse } from './parse';
import { DateTimePropertyType } from './index';
import timezone_mock from 'timezone-mock';
import dayjs from 'dayjs';

describe('parse', () => {
    before(() => {
        timezone_mock.register('UTC');
    });
    after(() => {
        timezone_mock.unregister();
    });

    const values: {
        [key in DateTimePropertyType]: { input: string; expectedJson: string };
    } = {
        date: { input: '2023-05-23', expectedJson: '2023-05-23T00:00:00.000Z' },
        time: { input: '17:44', expectedJson: '1970-01-01T17:44:00.000Z' },
        year: { input: '2023', expectedJson: '2023-01-01T00:00:00.000Z' },
        quarter: { input: '2023 Q2', expectedJson: '2023-04-01T00:00:00.000Z' },
        month: { input: '2023-05', expectedJson: '2023-05-01T00:00:00.000Z' },
        week: { input: '2023 w21', expectedJson: '2023-05-22T00:00:00.000Z' },
    };

    Object.keys(values).forEach((type: DateTimePropertyType) => {
        it(`parses ${type} correctly`, () => {
            const value = values[type];
            const result = parse(value.input, type);
            expect(result).to.be.an.instanceOf(dayjs);
            expect(result.toJSON()).to.equal(value.expectedJson);
        });
    });

    it('can handle a Dayjs object', () => {
        const input = dayjs('2035-05-23T12:34:56.789Z');
        const result = parse(input, 'date');
        expect(result).to.be.an.instanceOf(dayjs);
        expect(result.toJSON()).to.equal('2035-05-23T12:34:56.789Z');
    });

    it('can handle a Date object', () => {
        const input = new Date('2035-05-23T12:34:56.789Z');
        const result = parse(input, 'date');
        expect(result).to.be.an.instanceOf(dayjs);
        expect(result.toJSON()).to.equal('2035-05-23T12:34:56.789Z');
    });
});
