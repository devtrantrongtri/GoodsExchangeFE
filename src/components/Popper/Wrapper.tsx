import React, { ReactNode } from 'react'

function Wrapper({children} : {children: ReactNode}) {
  return (
    <div className='bg-white w-[48rem] p-5'>
        {children}
    </div>
  )
}

export default Wrapper