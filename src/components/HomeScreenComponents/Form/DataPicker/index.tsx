import React, { memo, useState } from 'react';
import { DateData } from 'react-native-calendars';
import { View } from 'react-native-ui-lib';
import ExpandedCalendarComponent from '../../ExpandedCalendarComponent/ExpandableCalendar';

interface DataPickerProps {
  onChange: (value: string) => void;
  dateString: string;
}

const DataPicker: React.FC<DataPickerProps> = ({ onChange, dateString }) => {
  const [date, setDate] = useState(dateString)
  const onDatePressed = (dateObj: DateData) => {
    setDate(dateObj.dateString)
    console.log('dateObj', dateObj)
    onChange(dateObj.dateString);
  };

  return (
    <View>
      <ExpandedCalendarComponent
        dateString={date}
        children={null}
        onDatePressed={onDatePressed}
      />
    </View>
  )
};

export default DataPicker;

