import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='flex w-5/12'>
            <div className='flex w-1/2 justify-center items-center'>Icon of IITG</div>
            <div className='flex w-1/2 justify-center items-center'>
                <Link to="/vicepresident" className='p-3 bg-blue-600 text-white'>Start Voting</Link>
            </div>
        </div>
    </div>
  )
}

export default WelcomeScreen;