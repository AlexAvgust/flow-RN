import React, { memo } from 'react';
import { DateData } from 'react-native-calendars';
import { View } from 'react-native-ui-lib';
import ExpandedCalendarComponent from '../../../SharedComponents/ExpandedCalendarComponent/ExpandableCalendar';

interface DataPickerProps {
  onChange: (value: string) => void;
  dateRef: React.MutableRefObject<string>;
}

const DataPicker: React.FC<DataPickerProps> = ({ onChange, dateRef }) => {
  const onCalendarPress = (dateObj: DateData) => {
    onChange(dateObj.dateString);
  };

  return (
    <View>
      <ExpandedCalendarComponent
        dateRef={dateRef}
        children={null}
        onDatePressed={onCalendarPress}
      />
    </View>
  )
};

export default memo(DataPicker);

