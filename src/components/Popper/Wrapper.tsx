import React, { ReactNode } from 'react'

function Wrapper({children} : {children: ReactNode}) {
  return (
    <div className='bg-white w-[48rem] max-h-96 overflow-y-auto overflow-scroll	]'>
        {children}
    </div>
  )
}

export default Wrapper