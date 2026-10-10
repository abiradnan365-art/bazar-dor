import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { Suspense } from "react";
import Loading from "./category/[categoryId]/loading";

export default function Home() {
return ( <div>
<Suspense fallback={<div><Loading /></div>}> <Banner /> </Suspense>



  <Suspense fallback={<div> <Loading /></div>}>
    <Products />
  </Suspense>
</div>


);
}
