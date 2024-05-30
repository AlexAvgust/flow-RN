import moment from 'moment';
import React, { Dispatch, MutableRefObject, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Task } from '../../../types/TaskType';
import { mapPriorityToColor } from '../../../utils/colorMaper';
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../../../store/slices/taskSlice';


interface ItemProps {
    item: Task;
    setShowDetails: Dispatch<React.SetStateAction<boolean>>;
}

const AgendaItem: React.FC<ItemProps> = ({ item, setShowDetails }) => {
    const dispatch = useDispatch()
    const itemPressed = useCallback(() => {
        setShowDetails(state => !state)
        dispatch(setSelectedTask(item))
    }, []);
    const taskDuration = useMemo(() => moment.duration(item.taskDuration).format('h [h] m [m]'), [item.taskDuration])

    return (
        <TouchableOpacity onPress={itemPressed} style={[styles.item, { borderRightColor: mapPriorityToColor(item.priority) }]}>
            <View style={styles.itemDurationContainer}>
                <Text style={styles.itemDurationText}>{taskDuration}</Text>
            </View>
            <View style={styles.itemNameAndDescriptionContainer}>

                <Text style={styles.itemTitleText}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.itemButtonContainer}>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(AgendaItem);


const styles = StyleSheet.create({
    item: {
        padding: 18,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        borderRightWidth: 9,
    },
    itemHourText: {
        color: 'black'
    },
    itemDurationText: {
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
    itemTitleText: {
        color: 'black',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 16
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    itemNameAndDescriptionContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    itemDurationContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontSize: 15,
        color: 'grey',
        fontWeight: '300',
        marginLeft: 16
    }
});