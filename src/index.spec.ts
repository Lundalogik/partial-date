import { expect } from 'chai';
import dayjs from 'dayjs';
import { PartialDate } from './index';
import timezoneMock, { TimeZone } from 'timezone-mock';

const TIMEZONES: TimeZone[] = [
    'UTC',
    'US/Pacific',
    'Europe/London',
    'Australia/Adelaide',
];

describe('PartialDate', () => {
    it('is a function', () => {
        expect(PartialDate).to.be.a('function');
    });
    it('accepts a string value along with a type', () => {
        const date = new PartialDate('2025-05-23', 'date');
        expect(date).to.be.an.instanceof(PartialDate);
    });
    it('accepts a Dayjs value along with a type', () => {
        const date = new PartialDate(dayjs(), 'date');
        expect(date).to.be.an.instanceof(PartialDate);
    });
    it('accepts a Date value along with a type', () => {
        const date = new PartialDate(new Date(), 'date');
        expect(date).to.be.an.instanceof(PartialDate);
    });
    describe('.toDate()', () => {
        context('in UTC timezone', () => {
            beforeEach(() => {
                timezoneMock.register('UTC');
            });
            afterEach(() => {
                timezoneMock.unregister();
            });

            context('with a date', () => {
                let date: PartialDate;
                const type = 'date';

                beforeEach(() => {
                    date = new PartialDate('2025-05-23', type);
                });
                it('returns a Date object with the correct value', () => {
                    expect(date.toDate().toISOString()).to.equal(
                        '2025-05-23T00:00:00.000Z'
                    );
                });
            });
            context('with a week', () => {
                let date: PartialDate;
                const type = 'week';

                beforeEach(() => {
                    date = new PartialDate('2025 w45', type);
                });
                it('returns a Date object with the correct value', () => {
                    expect(date.toDate().toISOString()).to.equal(
                        '2025-11-03T00:00:00.000Z'
                    );
                });
            });
            context('with a month', () => {
                let date: PartialDate;
                const type = 'month';

                beforeEach(() => {
                    date = new PartialDate('2025-05', type);
                });
                it('returns a Date object with the correct value', () => {
                    expect(date.toDate().toISOString()).to.equal(
                        '2025-05-01T00:00:00.000Z'
                    );
                });
            });
            context('with a quarter', () => {
                let date: PartialDate;
                const type = 'quarter';

                beforeEach(() => {
                    date = new PartialDate('2025 Q3', type);
                });
                it('returns a Date object with the correct value', () => {
                    expect(date.toDate().toISOString()).to.equal(
                        '2025-07-01T00:00:00.000Z'
                    );
                });
            });
            context('with a year', () => {
                let date: PartialDate;
                const type = 'year';

                beforeEach(() => {
                    date = new PartialDate('2025', type);
                });
                it('returns a Date object with the correct value', () => {
                    expect(date.toDate().toISOString()).to.equal(
                        '2025-01-01T00:00:00.000Z'
                    );
                });
            });
            context('with a time', () => {
                let date: PartialDate;
                const type = 'time';

                beforeEach(() => {
                    date = new PartialDate('12:34', type);
                });
                it('returns a Date object with the correct value', () => {
                    expect(date.toDate().toISOString()).to.equal(
                        '1970-01-01T12:34:00.000Z'
                    );
                });
            });
        });
    });
    describe('.toString()', () => {
        context('with a date', () => {
            let date: PartialDate;
            const type = 'date';

            beforeEach(() => {
                date = new PartialDate('2025-05-23', type);
            });
            it('returns the date in ISO format', () => {
                expect(date.toString()).to.equal('2025-05-23');
            });
        });
        context('with a week', () => {
            let date: PartialDate;
            const type = 'week';

            beforeEach(() => {
                date = new PartialDate('2025 w45', type);
            });
            it('returns the date in the format YYYY [w]WW', () => {
                expect(date.toString()).to.equal('2025 w45');
            });
        });
        context('with a month', () => {
            let date: PartialDate;
            const type = 'month';

            beforeEach(() => {
                date = new PartialDate('2025-05', type);
            });
            it('returns the date in the format YYYY-MM', () => {
                expect(date.toString()).to.equal('2025-05');
            });
        });
        context('with a quarter', () => {
            let date: PartialDate;
            const type = 'quarter';

            beforeEach(() => {
                date = new PartialDate('2025 Q3', type);
            });
            it('returns the date in the format YYYY [Q]Q', () => {
                expect(date.toString()).to.equal('2025 Q3');
            });
        });
        context('with a year', () => {
            let date: PartialDate;
            const type = 'year';

            beforeEach(() => {
                date = new PartialDate('2025', type);
            });
            it('returns the date in the format YYYY', () => {
                expect(date.toString()).to.equal('2025');
            });
        });
        context('with a time', () => {
            let date: PartialDate;
            const type = 'time';

            beforeEach(() => {
                date = new PartialDate('12:34', type);
            });
            it('returns the date in the format HH:mm', () => {
                expect(date.toString()).to.equal('12:34');
            });
        });
    });

    context('with a Date object as input', () => {
        context('in UTC timezone', () => {
            let date: Date;

            beforeEach(() => {
                timezoneMock.register('UTC');
                date = new Date('2025-05-23T12:34:56.789Z');
            });
            afterEach(() => {
                timezoneMock.unregister();
            });

            it('can extract the date', () => {
                const partialDate = new PartialDate(date, 'date');
                expect(partialDate.toString()).to.equal('2025-05-23');
            });
            it('can extract the time', () => {
                const partialDate = new PartialDate(date, 'time');
                expect(partialDate.toString()).to.equal('12:34');
            });
            it('can extract the year', () => {
                const partialDate = new PartialDate(date, 'year');
                expect(partialDate.toString()).to.equal('2025');
            });
            it('can extract the quarter', () => {
                const partialDate = new PartialDate(date, 'quarter');
                expect(partialDate.toString()).to.equal('2025 Q2');
            });
            it('can extract the month', () => {
                const partialDate = new PartialDate(date, 'month');
                expect(partialDate.toString()).to.equal('2025-05');
            });
            it('can extract the week', () => {
                const partialDate = new PartialDate(date, 'week');
                expect(partialDate.toString()).to.equal('2025 w21');
            });
        });
    });

    context(
        'parsing a string, getting it as a Date object, manipulating that object, and then converting it back to a string on the original format',
        () => {
            TIMEZONES.forEach((timezone) => {
                context(`in ${timezone} timezone`, () => {
                    const thirdPartyDateLib = {
                        setDateTo11: (date: Date) => {
                            const output = new Date(date);
                            output.setDate(11);

                            return output;
                        },
                        setMonthToJune: (date: Date) => {
                            const output = new Date(date);
                            output.setMonth(5);

                            return output;
                        },
                        setYearTo2023: (date: Date) => {
                            const output = new Date(date);
                            output.setFullYear(2023);

                            return output;
                        },
                        setTimeTo00h00: (date: Date) => {
                            const output = new Date(date);
                            output.setHours(0);
                            output.setMinutes(0);

                            return output;
                        },
                        setTimeTo23h59: (date: Date) => {
                            const output = new Date(date);
                            output.setHours(23);
                            output.setMinutes(59);

                            return output;
                        },
                    };

                    beforeEach(() => {
                        timezoneMock.register(timezone);
                    });
                    afterEach(() => {
                        timezoneMock.unregister();
                    });

                    context('with a date', () => {
                        const type = 'date';

                        it('produces the correct value', () => {
                            const valueAsFetchedFromServer = '2025-05-23';
                            const valueAsDate = new PartialDate(
                                valueAsFetchedFromServer,
                                type
                            ).toDate();
                            const updatedDate =
                                thirdPartyDateLib.setYearTo2023(valueAsDate);
                            const result = new PartialDate(
                                updatedDate,
                                type
                            ).toString();

                            expect(result).to.equal('2023-05-23');
                        });
                    });
                    context('with a week', () => {
                        const type = 'week';

                        it('produces the correct value', () => {
                            const valueAsFetchedFromServer = '2022 w21';
                            const valueAsDate = new PartialDate(
                                valueAsFetchedFromServer,
                                type
                            ).toDate();
                            const updatedDate =
                                thirdPartyDateLib.setDateTo11(valueAsDate);
                            const result = new PartialDate(
                                updatedDate,
                                type
                            ).toString();

                            expect(result).to.equal('2022 w19');
                        });
                    });
                    context('with a month', () => {
                        const type = 'month';

                        it('produces the correct value', () => {
                            const valueAsFetchedFromServer = '2025-05';
                            const valueAsDate = new PartialDate(
                                valueAsFetchedFromServer,
                                type
                            ).toDate();
                            const updatedDate =
                                thirdPartyDateLib.setYearTo2023(valueAsDate);
                            const result = new PartialDate(
                                updatedDate,
                                type
                            ).toString();

                            expect(result).to.equal('2023-05');
                        });
                    });
                    context('with a quarter', () => {
                        const type = 'quarter';

                        it('produces the correct value', () => {
                            const valueAsFetchedFromServer = '2025 Q3';
                            const valueAsDate = new PartialDate(
                                valueAsFetchedFromServer,
                                type
                            ).toDate();
                            const updatedDate =
                                thirdPartyDateLib.setMonthToJune(valueAsDate);
                            const result = new PartialDate(
                                updatedDate,
                                type
                            ).toString();

                            expect(result).to.equal('2025 Q2');
                        });
                    });
                    context('with a year', () => {
                        const type = 'year';

                        it('produces the correct value', () => {
                            const valueAsFetchedFromServer = '2025';
                            const valueAsDate = new PartialDate(
                                valueAsFetchedFromServer,
                                type
                            ).toDate();
                            const updatedDate =
                                thirdPartyDateLib.setYearTo2023(valueAsDate);
                            const result = new PartialDate(
                                updatedDate,
                                type
                            ).toString();

                            expect(result).to.equal('2023');
                        });
                    });
                    context('with a time', () => {
                        const type = 'time';

                        context('when setting the time to 00:00', () => {
                            it('produces the correct value', () => {
                                const valueAsFetchedFromServer = '12:00';
                                const valueAsDate = new PartialDate(
                                    valueAsFetchedFromServer,
                                    type
                                ).toDate();
                                const updatedDate =
                                    thirdPartyDateLib.setTimeTo00h00(
                                        valueAsDate
                                    );
                                const result = new PartialDate(
                                    updatedDate,
                                    type
                                ).toString();

                                expect(result).to.equal('00:00');
                            });
                        });
                        context('when setting the time to 23:59', () => {
                            it('produces the correct value', () => {
                                const valueAsFetchedFromServer = '12:00';
                                const valueAsDate = new PartialDate(
                                    valueAsFetchedFromServer,
                                    type
                                ).toDate();
                                const updatedDate =
                                    thirdPartyDateLib.setTimeTo23h59(
                                        valueAsDate
                                    );
                                const result = new PartialDate(
                                    updatedDate,
                                    type
                                ).toString();

                                expect(result).to.equal('23:59');
                            });
                        });
                    });
                });
            });
        }
    );

    context('with edge case datetimes', () => {
        const expectedISOStrings = {
            UTC: {
                earlyEdge: '2022-08-01T00:00:00.000Z',
                lateEdge: '2022-07-31T23:59:59.999Z',
            },
            'US/Pacific': {
                earlyEdge: '2022-08-01T07:00:00.000Z',
                lateEdge: '2022-08-01T06:59:59.999Z',
            },
            'Europe/London': {
                earlyEdge: '2022-07-31T23:00:00.000Z',
                lateEdge: '2022-07-31T22:59:59.999Z',
            },
            'Australia/Adelaide': {
                earlyEdge: '2022-07-31T14:30:00.000Z',
                lateEdge: '2022-07-31T14:29:59.999Z',
            },
        };
        const expectedISOStringsYearEdge = {
            UTC: {
                earlyEdge: '2023-01-01T00:00:00.000Z',
                lateEdge: '2022-12-31T23:59:59.999Z',
            },
            'US/Pacific': {
                earlyEdge: '2023-01-01T08:00:00.000Z',
                lateEdge: '2023-01-01T07:59:59.999Z',
            },
            'Europe/London': {
                earlyEdge: '2023-01-01T00:00:00.000Z',
                lateEdge: '2022-12-31T23:59:59.999Z',
            },
            'Australia/Adelaide': {
                earlyEdge: '2022-12-31T13:30:00.000Z',
                lateEdge: '2022-12-31T13:29:59.999Z',
            },
        };

        TIMEZONES.forEach((timezone) => {
            context(`in ${timezone} timezone`, () => {
                let earlyEdge: Date;
                let lateEdge: Date;

                beforeEach(() => {
                    timezoneMock.register(timezone);
                    earlyEdge = new Date('2022-08-01 00:00:00.000');
                    lateEdge = new Date('2022-07-31 23:59:59.999');

                    // Check that the timezone is set correctly, so that the tests below are valid
                    expect(earlyEdge.toISOString()).to.equal(
                        expectedISOStrings[timezone].earlyEdge
                    );
                    expect(lateEdge.toISOString()).to.equal(
                        expectedISOStrings[timezone].lateEdge
                    );
                });
                afterEach(() => {
                    timezoneMock.unregister();
                });

                context('with a date', () => {
                    const type = 'date';

                    it('produces the correct output for "early" edge cases', () => {
                        const partialDate = new PartialDate(earlyEdge, type);
                        expect(partialDate.toString()).to.equal('2022-08-01');
                    });
                    it('produces the correct output for "late" edge cases', () => {
                        const partialDate = new PartialDate(lateEdge, type);
                        expect(partialDate.toString()).to.equal('2022-07-31');
                    });
                });

                context('with a week', () => {
                    const type = 'week';

                    it('produces the correct output for "early" edge cases', () => {
                        const partialDate = new PartialDate(earlyEdge, type);
                        expect(partialDate.toString()).to.equal('2022 w31');
                    });
                    it('produces the correct output for "late" edge cases', () => {
                        const partialDate = new PartialDate(lateEdge, type);
                        expect(partialDate.toString()).to.equal('2022 w30');
                    });
                });

                context('with a month', () => {
                    const type = 'month';

                    it('produces the correct output for "early" edge cases', () => {
                        const partialDate = new PartialDate(earlyEdge, type);
                        expect(partialDate.toString()).to.equal('2022-08');
                    });
                    it('produces the correct output for "late" edge cases', () => {
                        const partialDate = new PartialDate(lateEdge, type);
                        expect(partialDate.toString()).to.equal('2022-07');
                    });
                });

                context('with a quarter', () => {
                    const type = 'quarter';

                    beforeEach(() => {
                        earlyEdge = new Date('2023-01-01 00:00');
                        lateEdge = new Date('2022-12-31 23:59:59.999');

                        // Check that the timezone is set correctly, so that the tests below are valid
                        expect(earlyEdge.toISOString()).to.equal(
                            expectedISOStringsYearEdge[timezone].earlyEdge
                        );
                        expect(lateEdge.toISOString()).to.equal(
                            expectedISOStringsYearEdge[timezone].lateEdge
                        );
                    });

                    it('produces the correct output for "early" edge cases', () => {
                        const partialDate = new PartialDate(earlyEdge, type);
                        expect(partialDate.toString()).to.equal('2023 Q1');
                    });
                    it('produces the correct output for "late" edge cases', () => {
                        const partialDate = new PartialDate(lateEdge, type);
                        expect(partialDate.toString()).to.equal('2022 Q4');
                    });
                });

                context('with a year', () => {
                    const type = 'year';

                    beforeEach(() => {
                        earlyEdge = new Date('2023-01-01 00:00');
                        lateEdge = new Date('2022-12-31 23:59:59.999');

                        // Check that the timezone is set correctly, so that the tests below are valid
                        expect(earlyEdge.toISOString()).to.equal(
                            expectedISOStringsYearEdge[timezone].earlyEdge
                        );
                        expect(lateEdge.toISOString()).to.equal(
                            expectedISOStringsYearEdge[timezone].lateEdge
                        );
                    });

                    it('produces the correct output for "early" edge cases', () => {
                        const partialDate = new PartialDate(earlyEdge, type);
                        expect(partialDate.toString()).to.equal('2023');
                    });
                    it('produces the correct output for "late" edge cases', () => {
                        const partialDate = new PartialDate(lateEdge, type);
                        expect(partialDate.toString()).to.equal('2022');
                    });
                });

                context('with a time', () => {
                    const type = 'time';

                    it('produces the correct output for "early" edge cases', () => {
                        const partialDate = new PartialDate(earlyEdge, type);
                        expect(partialDate.toString()).to.equal('00:00');
                    });
                    it('produces the correct output for "late" edge cases', () => {
                        const partialDate = new PartialDate(lateEdge, type);
                        expect(partialDate.toString()).to.equal('23:59');
                    });
                });
            });
        });
    });
});
