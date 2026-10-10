import Link from 'next/link';
import React from 'react';

interface Product {
    id: string | number;
    categoryIcon?: string;
    categoryNameBn?: string;
    image?: string;
    nameBn: string;
    unit: string;
    today: number | string;
    change?: {
        dir?: "up" | "down" | "same";
        pct?: number | string;
    };
}

interface ProductsCardProps {
    sortedProducts: Product[];
}

const ProductsCard = ({ sortedProducts }: ProductsCardProps) => {
    return (
        
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((item) => (
                    <Link href={`/products/${item.id}`} key={item.id}
                        className="rounded-[32px] border-2 border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
                    >

                        <div className="flex items-center gap-6">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[26px] bg-gray-100 text-5xl">
                                {item.image || item.categoryIcon}
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">
                                    {item.nameBn}
                                </h3>

                                <p className="mt-1 text-xl">
                                    {item.unit === "kg"
                                        ? "প্রতি কেজি"
                                        : item.unit === "piece"
                                            ? "প্রতি পিস"
                                            : `প্রতি ${item.unit}`}
                                </p>
                            </div>
                        </div>


                        <div className="mt-7 flex items-end justify-between gap-3">
                            <div>
                                <p className="text-xl">আজকের দাম</p>

                                <p className="mt-1 text-3xl font-bold">
                                    ৳{item.today} টাকা
                                </p>
                            </div>

                            {item.change?.dir === "up" ? (
                                <span className="mb-1 flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-xl font-bold text-red-600">
                                    <span>▲</span>
                                    {Number(item.change.pct ?? 0)}%
                                </span>
                            ) : item.change?.dir === "down" ? (
                                <span className="mb-1 flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-xl font-bold text-green-600">
                                    <span>▼</span>
                                    {Number(item.change.pct ?? 0)}%
                                </span>
                            ) : (
                                <span className="mb-1 flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-xl font-bold text-gray-600">
                                    <span>─</span>
                                    {Number(item.change?.pct ?? 0)}%
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
       

    );
};

export default ProductsCard;