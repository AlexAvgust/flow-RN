import moment from 'moment';
import 'moment-duration-format';
import React, { Dispatch, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, PanningProvider, Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getPriorityLabel } from '../../../utils/priorityMaper';
import ButtonWithStates from '../ButtonWithStates/ButtonWithStates';
import { usePathname, useRouter } from 'expo-router';
import { setSelectedTask } from '../../../store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useDeleteTaskMutation } from '../../../api/task/task';
import Toast from 'react-native-toast-message';

interface DialogProps {
    isVisible: boolean;
    setShowDetails: Dispatch<React.SetStateAction<boolean>>;
}

const Details: React.FC<DialogProps> = ({ isVisible, setShowDetails }) => {
    const selectedTask = useSelector((state: RootState) => state.task.selectedTask)!
    const dispatch = useDispatch()
    const path = usePathname()
    const router = useRouter()
    const [deleteTask, { isError, isLoading, isSuccess }] = useDeleteTaskMutation()
    const onEditPress = () => {
        router.push(`${path}/newTask`)
        setShowDetails(false);
    }

    const onDeletePress = () => {

        deleteTask(selectedTask._id)
            .unwrap()
            .then(() => {
                setShowDetails(false);
                Toast.show({
                    type: 'success',
                    text1: 'Task successfully deleted',
                })
                dispatch(setSelectedTask(null))
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong',
                })
                dispatch(setSelectedTask(null))
            })

    }

    const onDismiss = () => {
        dispatch(setSelectedTask(null))
        setShowDetails(false);
    }

    return (
        <Dialog
            containerStyle={styles.container}
            bottom={true}
            visible={isVisible}
            onDismiss={onDismiss}
            panDirection={PanningProvider.Directions.DOWN}
        >

            <Text style={styles.title} text60>{selectedTask.name}</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.labelAndValueContainer}>

                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{selectedTask.description}</Text>
                </View>

                <View style={styles.labelAndValueContainer}>

                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>
                        {moment(selectedTask.taskStartDate).format('D MMMM YYYY')}
                    </Text>
                </View>
                <View style={styles.labelAndValueContainer}>
                    <Text style={styles.label}>Day of the week:</Text>
                    <Text style={styles.value}>
                        {moment(selectedTask.taskStartDate).format('dddd')}
                    </Text>
                </View>
                <View style={styles.labelAndValueContainer}>

                    <Text style={styles.label}>Priority:</Text>
                    <Text style={styles.value}>{getPriorityLabel(selectedTask.priority)}</Text>
                </View>
                <View style={styles.labelAndValueContainer}>
                    <Text style={styles.label}>Duration:</Text>
                    <Text style={styles.value}>{moment.duration(selectedTask.taskDuration).format('h [hrs] m [mins]')}
                    </Text>
                </View>
                <View style={styles.labelAndValueContainer}>
                    <Text style={styles.label}>Task start time:</Text>
                    <Text style={styles.value}>{moment(selectedTask.taskStartTime).format('HH:mm')}
                    </Text>
                </View>
                <View style={styles.labelAndValueContainer}>
                    <Text style={styles.label}>Task end time:</Text>
                    <Text style={styles.value}>{moment(selectedTask.taskEndTime).format('HH:mm')}
                    </Text>
                </View>

                <View style={styles.labelAndValueContainer}>

                    <Text style={styles.label}>Repeating:</Text>
                    <Text style={styles.value}>{selectedTask.isRepeating ? 'Yes' : 'No'}</Text>
                </View>

                <View style={styles.labelAndValueContainer}>

                    <Text style={styles.label}>Task added by:</Text>
                    <Text style={styles.value}>{selectedTask.taskAddedBy}</Text>
                </View>
                {selectedTask.tags && selectedTask.tags.length > 0 && (
                    <>
                        <Text style={styles.label}>Tags:</Text>
                        <View style={styles.tagsContainer}>
                            {selectedTask.tags.map((tag, index) => (
                                <Text key={index} style={styles.tag}>
                                    {tag}
                                </Text>
                            ))}
                        </View>
                    </>
                )}
                <View style={styles.buttonContainer}>
                    <ButtonWithStates
                        label="Edit task"
                        onPressFunc={onEditPress}
                    />
                    <ButtonWithStates
                        label="Delete task"
                        onPressFunc={onDeletePress}
                        error={isError}
                        loading={isLoading}
                        success={isSuccess}
                    />
                </View>
            </View>
        </Dialog>
    )
}

export default memo(Details)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelAndValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    detailsContainer: {
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginTop: 10
    },
    value: {
        fontSize: 16,
        marginBottom: 10
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginTop: 4
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        marginTop: 20
    }
});