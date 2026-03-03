import React from 'react'
import './Navbar.css'
import logo from './assets/logo.png'

const Navbar = () => {
  return (
    <div>
      <div className='flex justify-between px-7'>
        <div className='p-2'>
            <img src={logo} alt="logo" className='w-45' />
        </div>
       
        <div className='space-x-10 text-xl p-3'>
            <span>Home</span>
            <span>Your task</span>
        </div>
       
      </div>
    </div>
  )
}
  
export default Navbar
