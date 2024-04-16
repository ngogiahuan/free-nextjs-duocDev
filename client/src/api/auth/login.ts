import { axiosConfig } from '@/api/config'
import { LoginBodyType, LoginResType, LoginResErrorType } from '@/schemaValidations/auth.schema'
import { AxiosError } from 'axios'

export const login = async (values: LoginBodyType) => {
  try {
    const response = await axiosConfig.post<LoginResType>('/auth/login', values)
    return { response, error: null }
  } catch (error) {
    const errorData = (error as AxiosError).response?.data as LoginResErrorType
    console.log(errorData)
    return { response: null, error: errorData }
  }
}
