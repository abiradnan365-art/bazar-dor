
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface Category {
    slug: string;
    nameBn: string;
    icon?: string;
}

const NavLinks = (): React.ReactElement => {
    const [data, setData] = useState<Category[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
            const categories: Category[] = await res.json();
            setData(categories);
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex gap-4 container max-w-6xl mx-auto ">
             <Link href={'/'}>হোম</Link>
            {data.map((n,i) => <Link className={pathname === '/category/' + n.slug ? 'bg-green-700 text-white p-1 rounded-sm' : ''} key={i} href={`/category/${n.slug}`}>{n.icon}{n.nameBn}</Link> )}
        </div>
    );
};

export default NavLinks;