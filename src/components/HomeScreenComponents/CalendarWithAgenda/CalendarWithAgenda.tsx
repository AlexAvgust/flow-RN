import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import useGetSchedules from '../../../hooks/useGetSchedules';
import { RootState } from '../../../store/store';
import { filterScheduleByDate } from '../../../utils/filterScheduleByDate';
import Details from '../../SharedComponents/Details/Details';
import AgendaListComponent from '../AgendaListComponent/AgendaListComponent';
import ExpandableCalendar from '../ExpandedCalendarComponent/ExpandableCalendar';

interface CalendarWithAgendaProps {
    dateRef: React.MutableRefObject<string>;
}

const CalendarWithAgenda: React.FC<CalendarWithAgendaProps> = ({ dateRef }) => {
    const schedule = useSelector((state: RootState) => state.schedule.schedule);
    const tasks = useMemo(() => filterScheduleByDate(schedule, dateRef.current), [schedule, dateRef.current])
    const [showDetails, setShowDetails] = useState(false)
    const dispatch = useDispatch();

    const { refetch, isFetching, isLoading, isSuccess } = useGetSchedules({ startDate: dateRef.current }, false)

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const onDatePressed = useCallback((date: DateData) => {
        dateRef.current = date.dateString
        refetch();
    }, [dispatch, refetch]);

    const loading = isLoading || isFetching;
    const showEmptyItem = !isLoading && tasks.length === 0 && !isFetching;
    const showList = tasks.length > 0 && isSuccess && !loading;

    return (
        <View flex-1 bg-white>
            <ExpandableCalendar
                onDatePressed={onDatePressed}
                dateString={dateRef.current}
            >
                <AgendaListComponent
                    setShowDetails={setShowDetails}
                    tasks={tasks}
                    showList={showList}
                    showEmptyItem={showEmptyItem} />
            </ExpandableCalendar>
            {showDetails && <Details setShowDetails={setShowDetails} isVisible={showDetails} />}
        </View>
    );
};

export default CalendarWithAgenda;
