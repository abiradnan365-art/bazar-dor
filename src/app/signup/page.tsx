import React from 'react';

const SignUpPage = () => {
    return (
        <div>
            <div className="mt-5">
                <form className="flex flex-col items-center gap-4" >
                    <h2 className='font-bold text-2xl text-green-700'>সাইন আপ</h2>
                    <fieldset className="fieldset border-base-300 rounded-box w-xs  p-4">

                        <label className="label">নাম</label>
                        <input name="name" type="text" className="input" placeholder="নাম" />


                        <label className="label">ইমেইল</label>
                        <input name="email" type="email" className="input" placeholder="ইমেইল" />

                        <label className="label">পাসওয়ার্ড</label>
                        <input name="password" type="password" className="input" placeholder="পাসওয়ার্ড" />

                        <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input name="confirmPassword" type="password" className="input" placeholder="পাসওয়ার্ড নিশ্চিত করুন" />

                        <button type="submit" className="btn btn-neutral mt-4 bg-green-700">সাইন আপ করুন</button>
                    </fieldset>
                    <p className="text-sm text-gray-500">-----------------অথবা-----------------</p>
                </form>

                <div className="flex flex-col items-center  mt-4">
                    <button className="btn btn-outline mt-4" >Google দিয়ে চালিয়ে যান</button>
                    <button className="btn btn-outline mt-4">GitHub দিয়ে চালিয়ে যান</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;