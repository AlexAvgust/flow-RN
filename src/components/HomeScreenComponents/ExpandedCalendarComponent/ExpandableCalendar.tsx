import React, { memo } from 'react';
import { DateData, ExpandableCalendar } from 'react-native-calendars';
import { View } from 'react-native-ui-lib';

interface ExpandedCalendarComponentProps {
  onDatePressed: (date: DateData) => void;
  children: React.ReactNode;
  dateString: string;

}

const ExpandedCalendarComponent: React.FC<ExpandedCalendarComponentProps> = ({ onDatePressed, children, dateString }) => {
  return (
    <View>
      <ExpandableCalendar
        firstDay={1}
        closeOnDayPress={false}
        markedDates={{ [dateString]: { selected: true } }}
        onDayPress={onDatePressed}
      />
      {children}

    </View>
  )
}

export default memo(ExpandedCalendarComponent) 

