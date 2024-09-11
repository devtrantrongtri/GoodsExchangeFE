import React, { ReactNode } from 'react'

function NoLayout({children} : {children: ReactNode}) {
  return (
    <div>
        {children}
    </div>
  )
}

export default NoLayout