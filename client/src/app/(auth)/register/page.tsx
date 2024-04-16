import RegisterForm from '@/app/(auth)/register/components/register-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Register to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <div>
          Already have an account?{' '}
          <Link href='/login' className='link'>
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
