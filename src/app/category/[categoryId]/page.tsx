import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import Loading from "@/app/category/[categoryId]/loading";
import { notFound } from "next/navigation";
interface CategoryParams {
categoryId: string;
}

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

const CategoryContent = async ({params,}: {params: Promise<CategoryParams>;}) => {
const { categoryId } = await params;

const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`);

if (!res.ok) {
throw new Error("Failed to fetch category products");
}

const data: Product[] = await res.json();
if (!Array.isArray(data) || data.length === 0) {
    notFound();
}

return <CategoryProducts data={data} />;
};

export default function CategoryPage({params,}: {params: Promise<CategoryParams>;}) {
return (
<Suspense fallback={<div className="p-5"><Loading /></div>}> <CategoryContent params={params} /> </Suspense>
);
}
