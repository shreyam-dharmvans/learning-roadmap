import React from 'react'
import { Separator } from './ui/separator'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className="MainClass text-center sm:text-left" id="footer">
            <Separator className="bg-gray-600" />
            <div className="grid my-10 grid-cols-1 sm:grid-cols-3 gap-8 p-5">

                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gradient">Learning Roadmaps</h1>
                </div>


                <div className="flex flex-col items-center sm:items-start space-y-2">
                    <h1 className="text-xl font-semibold text-gray-300">Quick Links</h1>
                    <Link href="/#login-button" className="text-gray-400 hover:text-blue-600">
                        Get Started
                    </Link>
                    <Link href="/#features-section" className="text-gray-400 hover:text-blue-600">
                        Features
                    </Link>
                </div>

                <div className="flex flex-col items-center sm:items-start space-y-2">
                    <h1 className="text-xl font-semibold text-gray-300">Contact Us</h1>
                    <Link href="/#features-section" className="text-gray-400 hover:text-blue-600">
                        Twitter
                    </Link>
                    <Link href="/#features-section" className="text-gray-400 hover:text-blue-600">
                        Gmail
                    </Link>
                    <Link href="/#features-section" className="text-gray-400 hover:text-blue-600">
                        LinkedIn
                    </Link>
                </div>
            </div>

            <Separator className="bg-gray-600" />
            <p className="my-5 text-gray-500 text-center">© Learning Roadmap 2025. All rights reserved.</p>
        </div>
    )
}

export default Footer