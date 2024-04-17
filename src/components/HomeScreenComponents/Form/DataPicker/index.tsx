import React, { memo } from 'react'
import { useField, useFormikContext } from 'formik'
import { DateData, ExpandableCalendar } from 'react-native-calendars'
import { View } from 'react-native-ui-lib'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import { setCurrentlySelectedDate } from '../../../../store/slices/taskSlice'
import moment from 'moment'


interface DataPickerProps {
  fieldName: string
}

const DataPicker: React.FC<DataPickerProps> = ({ fieldName }) => {
  const dispatch = useDispatch();
  const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate)
  const todayDate = moment(new Date()).format('YYYY-MM-DD')
  const { setFieldValue } = useFormikContext()
  const [field] = useField(fieldName)
  const onCalendarPress = (dateObj: DateData) => {
    dispatch(setCurrentlySelectedDate(dateObj.dateString))
    setFieldValue(field.name, dateObj.dateString)
  }
  return (
    <View>
      <ExpandableCalendar markedDates={{
        [todayDate]: { selected: false },
        [currentlySelectedDate]: { selected: true },
      }} onDayPress={onCalendarPress} />
    </View>
  )
}

export default memo(DataPicker)

