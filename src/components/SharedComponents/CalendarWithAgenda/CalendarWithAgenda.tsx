import moment from 'moment'
import React from 'react'
import { AgendaList, ExpandableCalendar } from 'react-native-calendars'
import { SkeletonView } from 'react-native-ui-lib'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import EmptyEventItem from '../EmptyEventItem/EmptyEventItem'
import { CalendarWithAgendaProps } from './CalendarWithAgendaInterfaces'
import AgendaItem from '../AgendaItem/AgendaItem'
import { Task } from '../../../types/TaskType'

const CalendarWithAgenda: React.FC<CalendarWithAgendaProps> = ({ onDatePressed, tasks }) => {
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate)
    console.log('currentlySelectedDate', currentlySelectedDate)
    const renderItem = ({ item }: { item: Task }) => {
        return <AgendaItem item={item} />;
    };


    return (
        <>
            <ExpandableCalendar markedDates={{
                [currentlySelectedDate]: { selected: true },
            }} onDayPress={onDatePressed} />
            {tasks === null || tasks?.length === 0 && <EmptyEventItem />}

            {tasks?.length! > 0 ? <AgendaList
                style={{ height: 200 }}
                renderItem={renderItem}
                sections={[{ data: tasks!, title: 'Tasks' }]} /> :
                < SkeletonView />}
        </>
    )
}

export default CalendarWithAgenda

