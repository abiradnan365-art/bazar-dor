import MarketPriceCard from '@/components/MarketPriceCard';
import React, { Suspense } from 'react';

const ProdectsDetail = async ({ params }: { params: Promise<{ productsId: string }> }) => {
    const { productsId } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${productsId}`);
    const data = await res.json();
    // console.log(data);
    const difference = data.today - data.yesterday;
    // console.log(difference, "difference");
    return (
        <div className="container max-w-6xl mx-auto mt-4">
            <div className="flex justify-between border-2 border-gray-200 rounded-2xl p-4   ">
                <div className="flex items-center gap-2">
                    <p className='text-5xl bg-gray-200 py-4 px-2 rounded-2xl'>{data.image}</p>
                    <div>
                        <h2 className="text-3xl font-bold">{data.nameBn}</h2>
                        <p className="text-lg text-gray-500">
                            {data.unit === "kg"
                                ? "প্রতি কেজি"
                                : data.unit === "piece"
                                    ? "প্রতি পিস"
                                    : `প্রতি ${data.unit}`}-{data.categoryNameBn}</p>
                        <p className={`text-lg font-semibold ${difference > 0 ? "text-red-500" : difference < 0 ? "text-green-600" : "text-gray-500"}`} > {difference > 0 ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${difference} টাকা` : difference < 0 ? `গতকালের তুলনায় আজ দাম কমেছে · ${Math.abs(difference)} টাকা` : "গতকালের তুলনায় আজ দাম অপরিবর্তিত · ০ টাকা"} </p>
                    </div>

                </div>
                <div className="bg-base-300 rounded-2xl p-4 text-center">
                    <p className="text-lg font-semibold mt-4 text-gray-500">আজকের দাম</p>
                    <p className="text-3xl font-bold mt-1 text-center">{data.today}</p>
                    <p className="text-lg text-gray-500 text-center">টাকা/{data.unit === "kg"
                        ? "কেজি"
                        : data.unit === "piece"
                            ? "পিস"
                            : `${data.unit}`}</p>
                    <p>{data.change?.dir === "up" ? (
                        <span className="mb-1  items-center gap-2 rounded-full  text-xl font-bold text-red-600 text-center">
                            <span>▲</span>
                            {Number(data.change?.pct)}%
                        </span>
                    ) : data.change?.dir === "down" ? (
                        <span className="mb-1  items-center gap-2 rounded-full text-xl font-bold text-green-600 text-center">
                            <span>▼</span>
                            {Number(data.change?.pct)}%
                        </span>
                    ) : (
                        <span className="mb-1 items-center gap-2 rounded-full  text-xl font-bold text-gray-600 text-center">
                            <span>─</span>
                            {Number(data.change?.pct)}%
                        </span>
                    )}</p>
                </div>
            </div>
            <div>
                <MarketPriceCard productsId={productsId} />
            </div>
        </div>
    );
};
export default function ProductsPage({ params }: { params: Promise<{ productsId: string }> }) {
    return (
        <Suspense fallback={<div className="p-5">Loading product...</div>}>
            <ProdectsDetail params={params} />
        </Suspense>
    );
}
// export default ProdectsDetail;