"use client";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from "react-toastify";

const SignInPage = () => {
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    const handleGitHubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");


        if (

            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন।");
            return;
        }

        // console.log(user);
        const { data, error } = await authClient.signIn.email({

            email,
            password,

        });

        if (error) {
            console.error("Error signing in:", error);
            toast.error("সাইন ইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }

        if (data) {
            console.log("User signed in successfully:", data);
            toast.success("সাইন ইন সফল হয়েছে! অনুগ্রহ করে আপনার ইমেইল যাচাই করুন।");
            redirect("/");
        }
    };
    return (
        <div>
            <div className="mt-5">
                <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
                    <h2 className='font-bold text-2xl text-green-700'>সাইন ইন</h2>
                    <fieldset className="fieldset border-base-300 rounded-box w-xs  p-4">



                        <label className="label">ইমেইল</label>
                        <input name="email" type="email" className="input" placeholder="ইমেইল" />

                        <label className="label">পাসওয়ার্ড</label>
                        <input name="password" type="password" className="input" placeholder="পাসওয়ার্ড" />

                        <button type="submit" className="btn btn-neutral mt-4 bg-green-700">সাইন ইন করুন</button>
                    </fieldset>
                    <p className="text-sm text-gray-500">-----------------অথবা-----------------</p>
                </form>
                <div className="flex flex-col items-center  mt-4">
                    <button onClick={handleGoogleSignIn} className="btn btn-outline mt-4" >Google দিয়ে চালিয়ে যান</button>
                    <button onClick={handleGitHubSignIn} className="btn btn-outline mt-4">GitHub দিয়ে চালিয়ে যান</button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;