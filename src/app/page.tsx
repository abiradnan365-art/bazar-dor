import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { Suspense } from "react";


export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading banner...</div>}>
        <Banner />
      
     
        <Products></Products>
      </Suspense>
      
    </div>
  );
}
