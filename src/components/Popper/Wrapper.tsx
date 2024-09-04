import React, { ReactNode } from 'react'

function Wrapper({children} : {children: ReactNode}) {
  return (
    <div className='bg-white w-[48rem]'>
        {children}
    </div>
  )
}

export default Wrapper