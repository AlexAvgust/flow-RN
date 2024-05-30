import React, { useCallback, useMemo, useState } from 'react';
import { AgendaList, DateData } from 'react-native-calendars';
import { SkeletonView, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { useGetScheduleByDateQuery } from '../../../api/schedule/schedule';
import { RootState } from '../../../store/store';
import { Task } from '../../../types/TaskType';
import { filterScheduleByDate } from '../../../utils/filterScheduleByDate';
import Details from '../../SharedComponents/Details/Details';
import EmptyEventItem from '../../SharedComponents/EmptyEventItem/EmptyEventItem';
import AgendaItem from '../AgendaItem/AgendaItem';
import ExpandableCalendar from '../ExpandedCalendarComponent/ExpandableCalendar';
import { useFocusEffect } from 'expo-router';
import useGetSchedules from '../../../hooks/useGetSchedules';

interface CalendarWithAgendaProps {
    dateRef: React.MutableRefObject<string>;
}

const CalendarWithAgenda: React.FC<CalendarWithAgendaProps> = ({ dateRef }) => {
    const schedule = useSelector((state: RootState) => state.schedule.schedule) || [];
    const [showDetails, setShowDetails] = useState(false)

    const dispatch = useDispatch();
    const tasks =  filterScheduleByDate(schedule, dateRef.current)
    const { refetch, isFetching, isLoading, isSuccess } = useGetSchedules({startDate: dateRef.current }, false)

    const onDatePressed = useCallback((date: DateData) => {
        dateRef.current = date.dateString
        refetch();
    }, [dispatch, refetch]);

    const renderItem = ({ item }: { item: Task }) => <AgendaItem setShowDetails={setShowDetails} item={item} />

    const loading = isLoading || isFetching;
    const showEmptyItem = !isLoading && tasks.length === 0 && !isFetching;
    const showList = tasks.length > 0 && isSuccess && !loading;
    const showContent = showEmptyItem || showList;

    return (
        <View flex-1 bg-white>
            <ExpandableCalendar
                onDatePressed={onDatePressed}
                dateString={dateRef.current}
            >
                {showContent ? (
                    <>
                        {showList && (
                            <AgendaList
                                renderItem={renderItem}
                                sections={[{ data: tasks, title: 'Tasks' }]}
                            />
                        )}
                        {showEmptyItem && <EmptyEventItem />}
                    </>
                ) : (
                    <View paddingT-20>
                        <SkeletonView
                            height={100}
                            template={SkeletonView.templates.TEXT_CONTENT}
                            showContent={false}
                            times={5}
                        />
                    </View>
                )}
                {showDetails && <Details setShowDetails={setShowDetails} isVisible={showDetails} />}
            </ExpandableCalendar>
        </View>
    );
};

export default CalendarWithAgenda;
