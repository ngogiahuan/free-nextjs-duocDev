import { ModeToggle } from '@/components/ui/theme/theme-toggle'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='py-4 flex items-center justify-between border-b-[1px] border-muted'>
      <div>
        <ul className='flex items-center gap-2'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li></li>
        </ul>
      </div>
      <div className='flex items-center gap-2'>
        <Link href='/register' className='underline'>
          Register
        </Link>
        <ModeToggle />
      </div>
    </div>
  )
}
