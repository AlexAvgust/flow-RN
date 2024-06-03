import React, { Dispatch, memo, useCallback } from 'react'
import { AgendaList } from 'react-native-calendars'
import { SkeletonView, View } from 'react-native-ui-lib'
import { Task } from '../../../types/TaskType'
import EmptyEventItem from '../../SharedComponents/EmptyEventItem/EmptyEventItem'
import AgendaItem from '../AgendaItem/AgendaItem'

interface AgendaListComponentProps {
    tasks: Task[]
    setShowDetails: Dispatch<React.SetStateAction<boolean>>
    showList: boolean
    showEmptyItem: boolean
}

const AgendaListComponent: React.FC<AgendaListComponentProps> = ({ setShowDetails, tasks, showList, showEmptyItem }) => {

    const renderItem = useCallback(({ item }: { item: Task }) => <AgendaItem setShowDetails={setShowDetails} item={item} />, [setShowDetails])


    if (showList) {
        return <AgendaList
            renderItem={renderItem}
            sections={[{ data: tasks, title: 'Tasks' }]}
        />
    } else if (showEmptyItem) {
        return <EmptyEventItem />
    } else {
        return <View paddingT-20>
            <SkeletonView
                height={100}
                template={SkeletonView.templates.TEXT_CONTENT}
                showContent={false}
                times={5}
            />
        </View>
    }

}

export default memo(AgendaListComponent)

