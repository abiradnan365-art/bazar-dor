import Link from 'next/link';
import React from 'react';

const notFound = () => {
    return (
        <div className='min-h-[70vh] flex items-center justify-center px-6'>
            <div className='text-center'>
                <p className='text-green-700 font-semibold  mb-3'>
                    বাজার দর
                </p>
                <h1 className='text-7xl md: text-9xl font-bold text-black'>
                    404
                </h1>
                <h2 className='text-2xl md:text-3xl font-bold text-black mt-4'>
                   পণ্য পাওয়া যায়নি।

                </h2>
                <p className='text-gray-400 mt-3'>
                    The page {`you're`} looking for{` doesn't `}exist.
                </p>
                <Link href="/"
                className="inline-block mt-6 bg-green-700 text-white font-bold px-6 py-3 rounded-2xl ">
                হোমে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default notFound;