import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const Navbar = () => {

    return (
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center justify-start ">
                <h1 className="text-lg sm:text-xl md:text-2xl text-gradient font-semibold">Learning Roadmaps</h1>
            </div>


            <div className="hidden sm:flex gap-10 font-semibold text-gray-300 mr-40 justify-between">

                <div className="relative group inline-block  ">
                    <Link href="/#features-section" className="border-none hover:text-blue-600">
                        Explore
                    </Link>
                </div>

                <div className="relative group inline-block">
                    <Link href="/#footer" className="border-none hover:text-blue-600">
                        Contact Us
                    </Link>
                </div>
            </div>

            <div className="md:flex gap-5 font-semibold text-gray-900 justify-self-end">
                <Button id="login-button" onClick={() => signIn('google')} className="flex items-center  hover:bg-blue-600 hover:text-white font-semibold h-10 text-md bg-gray-100 text-black space-x-2">
                    <FcGoogle size={40} />
                    <div className="border-l  border-gray-400 h-6 mx-2"></div>
                    <span className='text-gray-900 font-semibold hover:text-gray-100'>SignUp</span>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;