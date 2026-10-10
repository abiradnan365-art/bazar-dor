"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };
    const handleGitHubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
    }

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");

            if (
                typeof name !== "string" ||
                typeof email !== "string" ||
                typeof password !== "string" ||
                typeof confirmPassword !== "string"
            ) {
                toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন।");
                return;
            }

            if (password !== confirmPassword) {
                toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলছে না!");
                return;
            }
            // console.log(user);
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/"
            });

            if (error) {
                console.error("Error signing up:", error);
                toast.error("সাইন আপ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
            }

            if (data) {
                console.log("User signed up successfully:", data);
                toast.success("সাইন আপ সফল হয়েছে! অনুগ্রহ করে আপনার ইমেইল যাচাই করুন।");
                redirect("/");

            }



        };

        return (
            <div>
                <div className="mt-5">
                    <form onSubmit={onSubmit} className="flex flex-col items-center gap-4" >
                        <h2 className='font-bold text-2xl text-green-700'>অ্যাকাউন্ট তৈরি করুন</h2>
                        <p className="text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
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
                        <button onClick={handleGoogleSignIn} className="btn btn-outline mt-4">Google দিয়ে চালিয়ে যান</button>
                        <button onClick={handleGitHubSignIn} className="btn btn-outline mt-4">GitHub দিয়ে চালিয়ে যান</button>
                        <Link className="text-gray-500 mt-5 text-sm" href="/">← হোম পেজে ফিরে যান</Link>
                    </div>
                    
                </div>
            </div>
        );
    };

    export default SignUpPage;