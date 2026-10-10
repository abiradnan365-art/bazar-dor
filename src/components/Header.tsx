import Image from 'next/image';
import { connection } from "next/server";
import NavLinks from './NavLinks';
import Link from 'next/link';
import UserInfo from './UserInfo';

const Header = async () => {
    await connection();
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    })

    return (
        <div className="sticky top-0 z-50 bg-white shadow-sm">

            <div className="flex items-center justify-between container max-w-6xl mx-auto p-4">
                <Link  href="/" >
                    <div className="flex items-center gap-2 ">
                        <Image className="bg-green-700 p-2 rounded-lg w-10 h-10"
                            src="/logo-icon.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                        <div>
                            <h2 className='font-bold text-xl'>বাজার দর</h2>
                            <p className="text-sm ">{date}</p>
                        </div>
                    </div>
                </Link>
                <UserInfo />


            </div>
            <div className="border-y p-5 border-gray-200">
                <NavLinks />
            </div>
        </div>
    );
};

export default Header;