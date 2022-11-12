import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton';

type Props = {}

const Header = (props: Props) => {
    const session = true
    if (session) return (
        <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
            <div className='flex space-x-2'>
                <Image
                    className='mx-2 object-contain grayscale hover:grayscale-0'
                    height={10}
                    width={50}
                    src="https://i.imgur.com/n7kEnSq.png"
                    alt='Profile Picture'
                />
                <div>
                    <p className='text-blue-400'>Logged in as:</p>
                    <p className='font-bold text-lg'>Greg Shen</p>
                </div>
            </div>

            <LogoutButton />
        </header>
    )
    return (
        <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
            <div className='flex flex-col items-center space-y-5'>
                <div className='flex space-x-2 items-center'>
                    <Image
                        src="https://i.imgur.com/n7kEnSq.png"
                        height={10}
                        width={50}
                        alt="logo"
                    />

                    <p className='text-blue-400 font-bold'>This is an app for showing Aptos Token Design</p>
                </div>
                <Link
                    href='/auth/signin'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >Sign In</Link>
            </div>
        </header>
    )
}

export default Header