import React, { useCallback, useMemo } from 'react';
import { AgendaList, DateData } from 'react-native-calendars';
import { SkeletonView, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { useGetScheduleByDateQuery } from '../../../api/schedule/schedule';
import { RootState } from '../../../store/store';
import { Task } from '../../../types/TaskType';
import { filterScheduleByDate } from '../../../utils/filterScheduleByDate';
import EmptyEventItem from '../../SharedComponents/EmptyEventItem/EmptyEventItem';
import AgendaItem from '../AgendaItem/AgendaItem';
import ExpandableCalendar from '../ExpandedCalendarComponent/ExpandableCalendar';

interface CalendarWithAgendaProps {
    dateRef: React.MutableRefObject<string>;
}

const CalendarWithAgenda: React.FC<CalendarWithAgendaProps> = ( {dateRef}) => {
    const userId = useSelector((state: RootState) => state.user.user?._id) as string;
    const schedule = useSelector((state: RootState) => state.schedule.schedule) || [];
    const dispatch = useDispatch();
    const tasks = useMemo(() => filterScheduleByDate(schedule, dateRef.current), [schedule, dateRef.current]) 

    const { refetch, isLoading, isSuccess, isFetching } = useGetScheduleByDateQuery({ startDate: dateRef.current, userId });
    
    const onDatePressed = useCallback((date: DateData) => {
        console.log('dateString', date.dateString)
        dateRef.current = date.dateString
        refetch();
    }, [dispatch, refetch]);
    
    const renderItem = useCallback(({ item }: { item: Task }) => <AgendaItem item={item} />, []);
    
    const loading = isLoading || isFetching;
    const showEmptyItem = !isLoading && tasks.length === 0 && !isFetching;
    const showList = tasks.length > 0 && isSuccess && !loading;
    const showContent = showEmptyItem || showList;
    
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
            </ExpandableCalendar>
        </View>
    );
};

export default CalendarWithAgenda;
