import React, { memo } from 'react'
import { useField, useFormikContext } from 'formik'
import { DateData, ExpandableCalendar } from 'react-native-calendars'
import { View } from 'react-native-ui-lib'


interface DataPickerProps {
  fieldName: string
}

const DataPicker: React.FC<DataPickerProps> = ({ fieldName }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(fieldName)
  const onCalendarPress = (dateObj: DateData) => {
    setFieldValue(field.name, dateObj.timestamp)
  }
  return (
    <View>
      <ExpandableCalendar onDayPress={onCalendarPress} />
    </View>
  )
}

export default memo(DataPicker)

