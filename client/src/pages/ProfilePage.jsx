import React, { useContext, useState } from 'react'
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';


const ProfilePage = () => {
  const {authUser, updateProfile} =useContext(authContext);

  const [selectedImg, setSlectedImage] =useState(null);

  const [name, setName] =useState(authUser.fullName)
  const [bio, setBio] =useState(authUser.bio)

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio})
      navigate('/');
      return;
    }
    //if image selected:
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload  = async()=>{
      const base64Image=reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/') 
    }

  }

  return (
    <div className='flex items-center min-h-screen bg-cover bg-no-repeat justify-center'>
      <div className='backdrop-blur-2xl w-5/6 flex items-center max-w-2xl text-gray-300 border-2 border-gray-600 justify-between rounded-lg max-sm:flex-col-reverse'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1' action="">
            <h3 className='text-lg'>Profile details</h3>
            <label htmlFor="avatar"
            className='flex items-center gap-3'>
              <input onChange={(e)=>setSlectedImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden
              />
              <img src={selectedImg ? URL.createObjectURL(selectedImg): assets.avatar_icon} alt=""
              className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} 
              />
              Upload profile image
            </label>

            <input
            onChange={(e)=>setName(e.target.value)}
            value={name}
            type="text" placeholder='Your Name' required className='border p-2 rounded-md border-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 '/>
            <textarea
            onChange={(e)=>setBio(e.target.value)}
            value={bio}
            placeholder='Write profile bio' required className='border rounded-md p-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4}></textarea>

            <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-full p-2 cursor-pointer'>Save</button>
        </form>
        <img className={`max-w-44 mx-10 aspect-square rounded-full max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt="" />
      
      </div>
    </div>
  )
}

export default ProfilePage
