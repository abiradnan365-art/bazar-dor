import Banner from "@/components/Banner";
import { Suspense } from "react";


export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading banner...</div>}>
        <Banner />
      </Suspense>
      baxar dor
    </div>
  );
}
