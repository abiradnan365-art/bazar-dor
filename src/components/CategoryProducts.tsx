"use client";

import { useMemo, useState } from "react";

interface ProductChange {
    dir?: "up" | "down" | "same";
    pct?: number | string;
}

interface Product {
    id: string | number;
    categoryIcon?: string;
    categoryNameBn?: string;
    image?: string;
    nameBn: string;
    unit: string;
    today: number | string;
    change?: ProductChange;
}

interface CategoryProductsProps {
    data: Product[];
}

export default function CategoryProducts({ data, }: CategoryProductsProps) {
    const [sortBy, setSortBy] = useState("default");

    const sortedProducts = useMemo(() => {
        const products = [...data];


        if (sortBy === "low-to-high") {
            products.sort(
                (a, b) => Number(a.today) - Number(b.today)
            );
        }

        if (sortBy === "high-to-low") {
            products.sort(
                (a, b) => Number(b.today) - Number(a.today)
            );
        }

        return products;


    }, [data, sortBy]);

    return (<div className="container mx-auto max-w-6xl">
        <div className="mt-5 flex items-center gap-4 rounded-lg border border-gray-300 p-4"> <p className="text-2xl">
            {data[0]?.categoryIcon} </p>


            <h2 className="text-2xl font-bold">
                {data[0]?.categoryNameBn}
            </h2>
        </div>


        <div className="mt-5 flex items-center justify-between gap-4 px-5">
            <p className="text-lg font-medium">সাজান:</p>

            <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="select select-success"
            >
                <option value="default">ডিফল্ট</option>

                <option value="low-to-high">
                    কম থেকে বেশি
                </option>

                <option value="high-to-low">
                    বেশি থেকে কম
                </option>
            </select>
        </div>


        <section className="mx-auto max-w-6xl px-5 py-6">
            <p className="mb-5 text-gray-500">
                মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((item) => (
                    <div
                        key={item.id}
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
                    </div>
                ))}
            </div>
        </section>
    </div>


    );
}
