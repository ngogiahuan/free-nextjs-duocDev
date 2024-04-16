import React from 'react'

export default function layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='min-h-screen flex items-center justify-center'>{children}</div>
}
