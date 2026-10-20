import React from 'react'
import Button from '../ui/Button'

function Navbar() {
  return (
    <>
        <nav className='flex justify-between items-center px-20 py-4'>
            <h1 className='font-switzer font-bold'>TripTrip.com</h1>
            <div className='flex items-center gap-5'>
                <div className='flex items-center gap-2'>
                    <Button variant='secondary'>Sign In</Button>
                    <Button   Button variant='primary' className='px-4 py-2'>Get Started!!</Button>
                </div>
                 
                <button type='button' className='text-2xl text-textMoss gap-5'><i class="fi fi-br-bars-sort"></i></button>
            </div>
        </nav>
    </>
  )
}

export default Navbar