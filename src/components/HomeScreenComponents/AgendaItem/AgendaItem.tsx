import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Task } from '../../../types/TaskType';
import { mapPriorityToColor } from '../../../utils/colorMaper';


interface ItemProps {
    item: Task;
}

const AgendaItem: React.FC<ItemProps> = (props) => {
    const { item } = props;

    const itemPressed = useCallback(() => {
        //TODO: add edit task here
    }, []);
    const taskDuration = useMemo(() => moment(item.taskDuration).format('HH:mm'), [item.taskDuration])

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