import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({selectedUser,setSelectedUser}) => {
  return (
    <div className={`rounded-r-xl bg-[#8185B2]/10 overflow-y-scroll text-white h-full ${selectedUser ? "max-md:hidden":""}`}>

    <div className='pb-5 p-5'>
      <div className='flex justify-between items-center'>
        <img className='max-w-40' src={assets.logo} alt="logo" />
        <div className='relative py-2 group'>
        <img src={assets.menu_icon} className='max-h-5 cursor-pointer' alt="Menu" />
        <div className='absolute top-full right-0 border border-gray-600 text-gray-100 bg-[#282142] rounded z-20 w-32 p-5 hidden group-hover:block'>
            <p onClick={()=>useNavigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className='my-2 border-t broder-gray-500' />
            <p className='cursor-pointer text-sm'>Logout</p>
        </div>
        </div>
      </div>
    <div className='bg-[#282142] flex flex-cols gap-3 items-center rounded-full mt-5 px-4 py-3'>
        <img className='w-3' src={assets.search_icon} alt="" />
        <input className='border-none outline-none text-xs bg-transparent text-white flex-1 placeholder-[#c8c8c]' type="text" placeholder='Search User...' />
    </div>
    </div>

    <div className='flex flex-col gap-3'>
        {userDummyData.map((user,index)=>(
            <div onClick={()=>{setSelectedUser(user)}}
            key={index}
            className={`items-center flex relative gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-[#282142]/50'}`}>
                <img src={user?.profilePic || assets.avatar_icon} className='rounded-full w-[30px]' alt="" />
                <div className='flex flex-col leading-5'>
                    <p>{user.fullName}</p>
                    {
                        index<3
                        ? <span className='text-green-400 text-xs'>Online</span>
                        :
                        <span className='text-red-400 text-xs'>Offline</span>
                    }
                </div>
                {index>2 && <p className='bg-violet-500/50 rounded-full items-center flex h-5 w-5 absolute top-4 right-4 justify-center'>{index}</p>}
            </div>
        ))}
    </div>

    </div>
  )
}

export default Sidebar
