import moment from 'moment'

export const startAndEndOfTheMonth = (date: string) => {
    const momentDate = moment(date)
    return {
        startOfTheMonth: momentDate.startOf('month').format('YYYY-MM-DD'),
        endOfTheMonth: momentDate.endOf('month').format('YYYY-MM-DD'),
    }
}
