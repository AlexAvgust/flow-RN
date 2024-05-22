import React, { memo } from 'react';
import { DateData, ExpandableCalendar } from 'react-native-calendars';
import { View } from 'react-native-ui-lib';

interface ExpandedCalendarComponentProps {
  onDatePressed: (date: DateData) => void;
  children: React.ReactNode;
  dateRef: React.MutableRefObject<string>;

}

const ExpandedCalendarComponent: React.FC<ExpandedCalendarComponentProps> = ({ onDatePressed, children, dateRef }) => {
  return (
    <View>
      <ExpandableCalendar
        closeOnDayPress={false}
        markedDates={{ [dateRef.current]: { selected: true,selectedColor: 'gray' } }}
        onDayPress={onDatePressed}
      />
      {children}

    </View>
  )
}

export default memo(ExpandedCalendarComponent) 

