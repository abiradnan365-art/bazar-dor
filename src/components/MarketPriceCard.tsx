import React from "react";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    nameBn: string;
    unit: string;
    today: number;
    markets: Market[];
}

const MarketPriceCard = async ({ productsId }: { productsId: string }) => {
    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products/${productsId}`
    );

   

    const data: Product = await res.json();

    const minPrice = Math.min(...data.markets.map((market) => market.min));

    const maxPrice = Math.max(...data.markets.map((market) => market.max));

    const avgPrice =
        data.markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0
        ) / data.markets.length;

    return (
        <div className="container mx-auto max-w-6xl p-4">
            <div className="rounded-xl border border-gray-200 bg-[#f8fbf8] p-4 sm:p-6">
              
                <h2 className="mb-3 text-sm font-bold text-gray-800">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {/* Minimum Price */}
                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-xs text-gray-500">
                            সর্বনিম্ন দাম
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-green-600">
                            {minPrice} টাকা
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            সব বাজারের সর্বনিম্ন দাম
                        </p>
                    </div>

                   
                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-xs text-gray-500">
                            সর্বোচ্চ দাম
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-red-500">
                            {maxPrice} টাকা
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            সব বাজারের সর্বোচ্চ দাম
                        </p>
                    </div>

                    
                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-xs text-gray-500">
                            গড় দাম
                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-green-600">
                            {Math.round(avgPrice)} টাকা
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            প্রতি {data.unit === "kg" ? "কেজি" : data.unit} হিসাবে
                        </p>
                    </div>
                </div>

                
                <h2 className="mb-3 mt-6 text-base font-bold text-gray-800">
                    {data.nameBn} - বাজারভিত্তিক আজকের দাম
                </h2>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-[600px] border-collapse text-sm">
                        <thead className="bg-white text-gray-500">
                            <tr>
                                <th className="px-3 py-3 text-left font-semibold">
                                    বাজার
                                </th>

                                <th className="px-3 py-3 text-left font-semibold">
                                    বিভাগ
                                </th>

                                <th className="px-3 py-3 text-right font-semibold">
                                    সর্বনিম্ন
                                </th>

                                <th className="px-3 py-3 text-right font-semibold">
                                    সর্বোচ্চ
                                </th>

                                <th className="px-3 py-3 text-right font-semibold">
                                    গড়
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.markets.map((market, index) => {
                                const marketAvg = (market.min + market.max) / 2;

                                return (
                                    <tr
                                        key={`${market.market}-${index}`}
                                        className={`border-t border-gray-200 ${
                                            index % 2 === 0
                                                ? "bg-[#f8fbf8]"
                                                : "bg-[#eef4ef]"
                                        }`}
                                    >
                                        <td className="px-3 py-3 text-gray-800">
                                            {market.market}
                                        </td>

                                        <td className="px-3 py-3 text-gray-600">
                                            {market.division}
                                        </td>

                                        <td className="px-3 py-3 text-right text-gray-700">
                                            {market.min} টাকা
                                        </td>

                                        <td className="px-3 py-3 text-right text-gray-700">
                                            {market.max} টাকা
                                        </td>

                                        <td className="px-3 py-3 text-right font-semibold  text-gray-900">
                                            {marketAvg} টাকা
                                           
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MarketPriceCard;