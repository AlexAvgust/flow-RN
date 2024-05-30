import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native-ui-lib'
import { ButtonWithStatesProps } from './ButtonWithStates.types'

const ButtonWithStates: React.FC<ButtonWithStatesProps> = ({
  error, loading, success, label, onPressFunc
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#000')
  useEffect(() => {
    if (error) {
      setBackgroundColor('#FF0000')
    }
    if (loading) {
      setBackgroundColor('#a3a3a3')
    }
    if (success) {
      setBackgroundColor('#90ee90')
    }
  }, [error, loading, success])
  return (
      <Button paddingH-40 paddingV-15 animateLayout={true} backgroundColor={backgroundColor} onPress={onPressFunc} >
        <View row={true} gap-10>
          {loading ? <ActivityIndicator /> : null}
          <Text white>
            {label}
          </Text>
        </View>
      </Button>
  )
}

export default memo(ButtonWithStates)

const styles = StyleSheet.create({})