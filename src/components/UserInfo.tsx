"use client";
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    
    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success("সাইন আউট সফল হয়েছে!");
    }
    return (
        <div>
            {
                user ? (
                    <div>

                        <div>{user.name}</div>
                        <Link href="/profile" className="btn bg-green-700 text-white mr-2 btn-sm">প্রোফাইল</Link>
                        <button  onClick={handleSignOut} className={`btn btn-error btn-sm text-white `}>সাইন আউট</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/signin" className="btn ">সাইন ইন</Link>
                        <Link href="/signup" className="btn  bg-green-700 text-white">সাইন আপ</Link>
                    </div>
                )
            }

        </div>
    );
};

export default UserInfo;