import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/slices/userSlice'
import { User } from '../types/userType'
import { useEffect } from 'react'



const useGetUserByEmail = (email: string) => {
  const dispatch = useDispatch()
  const backendUrl = process.env.BACKEND_URL as string
  useEffect(() => {
    if (email) {
      axios.post<User>(`${backendUrl}/user?email=${email}`)
        .then(response => {
          dispatch(addUser(response.data))
        }).catch(error => {
          console.error(error)
        })
    }
  }, [email])

}

export default useGetUserByEmail