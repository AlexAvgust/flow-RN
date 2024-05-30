import React, { memo, useCallback, useState } from 'react';
import { Button, Text, View } from 'react-native-ui-lib';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface TimePickerProps {
  onChange: (value: Date) => void;
  fieldName: string;
  startTime?: string;
  endTime?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ fieldName, onChange, startTime, endTime }) => {
  const initialDate = startTime ? moment(startTime).toDate() : endTime ? moment(endTime).toDate() : new Date();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>(initialDate);

  const label = fieldName
    .split('_')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');

  const showDatePicker =() => {
    setDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    onChange(selectedDate);
    hideDatePicker();
  }

  const formattedTime = moment(date).format('HH:mm');

  return (
    <View gap-10 marginR row centerV>
      <Text>
        Selected: {formattedTime}
      </Text>
      <Button backgroundColor="#000" label={label} onPress={showDatePicker} />
      <DateTimePickerModal
        date={date}
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default TimePicker