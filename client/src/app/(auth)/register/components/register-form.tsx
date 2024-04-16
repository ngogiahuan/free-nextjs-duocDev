'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
import { register } from '@/api/auth/register'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: RegisterBodyType) {
    setIsLoading(true)
    await register(values)
      .then((res) => {
        if (res.error) {
          toast({
            variant: 'destructive',
            title: res.error.message,
            description: (
              <ul>
                {res.error.errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            )
          })
        } else {
          toast({
            variant: 'default',
            title: res.response?.data.message,
            description: res.response?.data.message
          })
          router.push('/login')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className=' sm:w-[24rem] md:w-[28rem] lg:w-[32rem] '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error)
          })}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>This is your public display email.</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Input placeholder='shadcn' {...field} type='password' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Input placeholder='shadcn' {...field} type='password' />
                </FormControl>
                <FormDescription>This is your password</FormDescription>
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
