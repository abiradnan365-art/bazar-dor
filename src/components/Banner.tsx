
import Image from 'next/image';
import { connection } from 'next/server';
import React from 'react';

const Banner = async () => {
    await connection();

    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
        <div className="container max-w-6xl mx-auto p-4">
            <div className="hero bg-base-200 min-h-[400px] lg:min-h-[450px] rounded-3xl">
                <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-12 p-6 lg:p-10">
                    <Image
                        width={500}
                        height={500}
                        className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md h-auto rounded-lg"
                        alt="Tailwind CSS hero component"
                        src="/bazar-hero.png"
                    />

                    <div className="text-center lg:text-left">
                        <p className="btn bg-green-200 text-green-600 mb-5 p-2 rounded-2xl">
                            {date}
                        </p>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="py-4 lg:py-6 text-gray-500">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <button className="btn bg-green-700 text-white">
                            সব পণ্য দেখুন
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

