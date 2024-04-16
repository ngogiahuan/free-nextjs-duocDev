import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '@/app/(auth)/login/components/login-form'
import Link from 'next/link'
export default function page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <div>
          Dont have account?{' '}
          <Link href='/register' className='link'>
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
