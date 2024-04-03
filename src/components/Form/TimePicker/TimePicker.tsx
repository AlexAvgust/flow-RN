import React, { memo, useCallback, useState } from 'react'
import { Button, View } from 'react-native-ui-lib'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFormik, useFormikContext } from 'formik';

interface TimePickerProps {
  fieldName: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ fieldName }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const ctx = useFormikContext()
  const label = fieldName
    .split('_')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ')

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, [fieldName]);
  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, [fieldName]);

  const handleConfirm = useCallback((time: Date) => {
    console.warn("A date has been picked: ", time);
    ctx.setFieldValue(fieldName, time)
    hideDatePicker();
  }, [fieldName]);

  return (
    <View marginR>
      <Button backgroundColor="#000" label={label} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

export default memo(TimePicker)

