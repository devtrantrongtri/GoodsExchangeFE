import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to={'/'}>
        <img className='h-auto min-w-[150px] max-w-[200px] min-h-[50px] max-h-[100px]' src="https://tuyensinh.ut.edu.vn/wp-content/uploads/2022/07/logo-full-768x146.png" alt="logo uth" />
    </Link>
  )
}

export default Logo