import React from 'react';
import { View } from 'react-native-ui-lib';
import AgendaComponent from '../../../../src/components/ScheduleScreenComponents/AgendaComponent/AgendaComponent';
import EmptyEventItem from '../../../../src/components/SharedComponents/EmptyEventItem/EmptyEventItem';

const AgendaScreen = () => {

    return (
        <View flex>
             <AgendaComponent
                renderEmptyDate={() => <EmptyEventItem />}
            />
        </View>
    );
};

export default AgendaScreen