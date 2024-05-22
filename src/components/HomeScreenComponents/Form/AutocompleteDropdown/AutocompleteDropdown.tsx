import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Autocomplete } from "react-native-dropdown-autocomplete";
import { View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

interface AutocompleteDropdownProps {
    onChange: (value: string) => void;
}

export const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = memo(({ onChange }) => {
    const taskNames = useSelector((state: RootState) => state.task.taskNames);

    const onChangeText = (value:string) => {
        onChange(value);
    };

    return (
        <View centerH style={styles.autocompleteContainer}>
            <Autocomplete
                containerStyle={styles.autocompleteDropdownStyle}
                inputStyle={styles.autocompleteInputStyle}
                inputContainerStyle={styles.taskNameFieldStyle}
                renderIcon={() => <></>}
                fetchData={() => Promise.resolve(taskNames)}
                scrollStyle={styles.autocompleteDropdownFlatListStyle}
                valueExtractor={item => item}
                handleSelectItem={item => onChangeText(item)}
                onChangeText={onChangeText}
            />
        </View>
    )
});


const styles = StyleSheet.create({
    autocompleteContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignSelf: 'stretch',
        gap: 3
    },
    autocompleteInputStyle: {
        width: '100%',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderColor: 'gray'
    },
    taskNameFieldStyle: {
        height: 40,
        width: '80%',
    },
    autocompleteDropdownStyle: {
        width: '100%',
        justifyContent: 'flex-start',
        borderTopWidth: 0,
        marginRight: 5,
    },
    autocompleteDropdownFlatListStyle: {
        borderColor: 'gray',
    },
});