import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import ButtonWithStates from '../../../../src/components/SharedComponents/ButtonWithStates/ButtonWithStates'
import { removeUser } from '../../../../src/store/slices/userSlice'
import ScreenSafeContainer from '../../../../src/components/SharedComponents/ScreenSafeContainer/ScreenSafeContainer'
import { revertAll } from '../../../../src/store/store'

const Profile = () => {
  const dispatch = useDispatch()
  const onLogoutPress = () => {
    dispatch(revertAll())
  }
  return (
    <ScreenSafeContainer>
      <ButtonWithStates label='Logout' onPressFunc={onLogoutPress} />
    </ScreenSafeContainer>
  )
}

export default Profile

const styles = StyleSheet.create({})