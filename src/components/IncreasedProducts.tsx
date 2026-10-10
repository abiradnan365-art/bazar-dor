import Link from "next/link";

interface Product {
    id: string | number;
    image?: string;
    categoryIcon?: string;
    nameBn: string;
    unit: string;
    today: number | string;
    change?: {
        dir?: string;
        pct?: number | string;
    };
};

const IncreasedProducts = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

    const data = (await res.json()) as Product[];

    const increasedProducts = data.filter(
        (item: Product) => item.change?.dir === "up"
    );

    if (increasedProducts.length === 0) {
        return null;
    }

    return (
        
            <section className="mx-auto max-w-6xl  px-5 py-6">
                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold ">
                    <span className="text-red-500">▲</span>
                    আজ দাম বেড়েছে
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {increasedProducts.slice(0, 6).map((item: Product) => (
                       <Link href={`/products/${item.id}`}
                            key={item.id}
                            className="rounded-[32px] border-2 border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
                        >

                            <div className="flex items-center gap-6">
                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[26px] bg-gray-100 text-5xl">
                                    {item.image || item.categoryIcon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold ">
                                        {item.nameBn}
                                    </h3>

                                    <p className="mt-1 text-xl ">
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
                                    <p className="text-xl ">
                                        আজকের দাম
                                    </p>

                                    <p className="mt-1 text-3xl font-bold ">
                                        ৳{item.today} টাকা
                                    </p>
                                </div>

                                <span className="mb-1 flex shrink-0 items-center gap-2 rounded-full  px-4 py-3 text-xl font-bold text-red-600">
                                    <span>▲</span>
                                    {Number(item.change?.pct)}%
                                </span>
                            </div>
                    </Link>
                    ))}
                </div>
            </section>
      
    );
};

export default IncreasedProducts;