import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-gray-600/20 relative overflow-y-scroll ${selectedUser ? "max-md:hidden": ""}`}>
      <div className='mt-20  gap-2 flex flex-col items-center'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} className='rounded-full w-20' alt="" />
        <h1 className='text-white flex gap-2 text-lg items-center'>
            <p className='w-2 h-2 rounded full bg-green-500'></p>
            {selectedUser.fullName}            
        </h1>
        <p className='text-white text-center text-xs font-light'>{selectedUser.bio}</p>
      </div>
        <hr className='my-5 border-gray-600' />
        <div className='mt-3 px-4'>
            <p className='text-white text-xs'> Media </p>
            <div className='grid grid-cols-2 gap-4 overflow-y-scroll opacity-80 mt-2 max-h-[200px]'>
                {imagesDummyData.map((url, index)=>(
                    <div key={index} onClick={()=>window.open(url)} className='cursor-pointer rounded'> 
                        <img src={url} alt="" className=' rounded' />
                    </div>
                ))}
            </div>
        </div>

        <div className='flex flex-col items-center'>
            <button className='md:px-20 sm:px-10 absolute bottom-5 border-none bg-gradient-to-r from-purple-400 to-violet-600 p-2 rounded-full text-white text-sm cursor-pointer'>Logout</button>
        </div>
    </div>
  )
}

export default RightSidebar
