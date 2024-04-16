import { axiosConfig } from '@/api/config'
import { RegisterBodyType, RegisterResErrorType, RegisterResType } from '@/schemaValidations/auth.schema'
import { AxiosError } from 'axios'

export const register = async (values: RegisterBodyType) => {
  try {
    const response = await axiosConfig.post<RegisterResType>('/auth/register', values)
    return { response, error: null }
  } catch (error) {
    const errorData = (error as AxiosError).response?.data as RegisterResErrorType
    console.log(errorData)
    return { response: null, error: errorData }
  }
}
