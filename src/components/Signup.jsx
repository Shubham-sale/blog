import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { login} from '../store/authSlice'
import {Button , Input, Logo } from './index'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
function Signup() {
    const navigate = useNavigate()
    const disaptch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const create = async(data) =>{
        console.log(data);
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    disaptch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg rounded-xl bg-gray-100 p-10 border border-black`}>
        <div className=' mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'><Logo width='100%'/></span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>Already have an account? &nbsp; 
            <Link
            to='/Login'
            className='font-medium text-primary transition-all duration-200 hover:underline'>
                Sign In
            </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p> }
        <form onSubmit={handleSubmit(create)} className='mt-8'>
                <div className='space-y-5'>
                <Input
                    lable="Full Name"
                    placeholder="Enter your full name"
                    {...register("name",{
                        required:true
                    })}
                    />
                    <Input
                    lable="Email: "
                    placeholder="Enter your Email"
                    type="email"
                    {...register("email",{
                        required: true,
                        validate:{
                            matchPatern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Email address must be valid",
                        }})}
                    />
                    <Input
                    lable="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required:true
                    })}
                    />
                    <Button
                    type= "submit"
                    >Create Account</Button>


                </div>
        </form>
        </div>

    </div>
  )
}

export default Signup