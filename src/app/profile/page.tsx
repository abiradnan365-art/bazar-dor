"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfileContent = ({user}: {
    user: { id: string; name?: string | null; email: string };}) => {
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        await authClient.signOut();
    };


    const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("নাম লিখুন");
            return;
        }

        if (name.trim() === user?.name) {
            toast.info("নামে কোনো পরিবর্তন করা হয়নি");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি");
                return;
            }

            toast.success("নাম সফলভাবে আপডেট হয়েছে");
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-3xl">

                <div className="mb-5">
                    <h2 className="text-xl font-bold text-gray-800">
                        আমার প্রোফাইল
                    </h2>

                    <p className="text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
                    </p>
                </div>

               
                <div className="mb-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-[#fbfdfb] p-5 sm:flex-row">

                    <div className="flex w-full items-center gap-3">

                        
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl font-bold uppercase text-green-700">
                            {user.name?.trim().charAt(0) || "U"}
                        </div>

                      
                        <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800">
                                {user.name}
                            </h3>

                            <p className="break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                   
                    <button
                        onClick={handleSignOut}
                        className="btn btn-outline btn-error btn-sm shrink-0"
                    >
                        ↪ সাইন আউট
                    </button>
                </div>

               
                <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-6">

                    <h3 className="mb-6 font-bold text-gray-700">
                        তথ্য
                    </h3>

                    <form onSubmit={handleUpdateName}>

                       
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm text-gray-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                required
                            />
                        </div>

                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn w-full border-none bg-green-700 text-white shadow-md hover:bg-green-800 disabled:opacity-60"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    if (!user) {
        return null;
    }

    return <ProfileContent key={user.id} user={user} />;
};

export default ProfilePage;