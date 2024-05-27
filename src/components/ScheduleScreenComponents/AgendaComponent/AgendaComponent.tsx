import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { useSelector } from 'react-redux'
import useAgendaSchedule from '../../../hooks/useAgendaSchedule'
import { RootState } from '../../../store/store'
import AgendaListItem from '../AgendaListItem/AgendaListItem'

interface AgendaComponentProps {
    renderEmptyDate: (date?: any) => React.Component | JSX.Element;
}

const AgendaComponent: React.FC<AgendaComponentProps> = ({ renderEmptyDate }) => {
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate)
    const { items, updateDateAndItems } = useAgendaSchedule()
   
        return (
            <Agenda
                firstDay={1}
                items={items}
                renderItem={(item) => <AgendaListItem reservation={item} />}
                renderEmptyDate={renderEmptyDate}
                loadItemsForMonth={updateDateAndItems}
                showClosingKnob={true}
                maxToRenderPerBatch={500}
                allowSelectionOutOfRange={true}
                selected={currentlySelectedDate}
                pastScrollRange={6}
                futureScrollRange={12}
                onDayPress={updateDateAndItems}
            />
        )

}

export default memo(AgendaComponent)

const styles = StyleSheet.create({})