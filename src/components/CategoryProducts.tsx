"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductsCard from "./ProductsCard";

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

    return (
        
            <div className="container mx-auto max-w-6xl">
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
                    <ProductsCard sortedProducts={sortedProducts} />

                </section>
            </div>
       

    );
}
