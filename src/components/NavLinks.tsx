import Link from 'next/link';
import React from 'react';

interface Category {
    slug: string;
    nameBn: string;
    icon?: string;
}

const NavLinks = async (): Promise<React.ReactElement> => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data: Category[] = await res.json();
    
    // console.log(data);
    return (
        <div className="flex gap-4 container max-w-6xl mx-auto ">
            {data.map((n,i) => <Link key={i} href={n.slug}>{n.icon}{n.nameBn}</Link> )}
        </div>
    );
};

export default NavLinks;