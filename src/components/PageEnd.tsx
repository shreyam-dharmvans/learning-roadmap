import Image from 'next/image'
import { Separator } from './ui/separator'
import React from 'react'
import Link from 'next/link'
import { SlSocialGithub } from "react-icons/sl";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const PageEnd = () => {
    return (
        <div>
            <Separator className='w-full bg-gray-400' />
            <div className='flex justify-center items-center my-5 text-sm text-gray-500'>
                © Learning Roadmaps 2025. All rights reserved.
            </div>
        </div>
    )
}

export default PageEnd