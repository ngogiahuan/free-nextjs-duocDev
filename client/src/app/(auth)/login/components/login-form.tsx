'use client'

import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { login } from '@/api/auth/login'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginBodyType) {
    setIsLoading(true)
    await login(values).then((res) => {
      console.log(res.response?.data)
      if (res.error) {
        toast({
          variant: 'destructive',
          title: res.error.message,
          description: res.error.message
        })
      } else {
        toast({
          variant: 'default',
          title: res.response?.data.message,
          description: res.response?.data.message
        })
        router.push('/')
      }
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
                <FormDescription>Enter your email address</FormDescription>
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
                <FormDescription>Enter your password</FormDescription>
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
