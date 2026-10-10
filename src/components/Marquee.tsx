import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Product {
    id: string | number;
    nameBn: string;
    today: string | number;
    unit: string;
    change: {
        dir: string;
        pct: string | number;
    };
};

const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const data = await res.json();
    // console.log(data);
    return (
        <div>
            <div className="flex gap-4 border-y p-2 border-gray-200 ">
                
               <MarqueeText className="bg-white" duration={8} 
               direction="right"
               pauseOnHover={true}
               >
                 {data.slice(0, 15).map((item: Product, index: number) => (
                     <Link href={`/products/${item.id}`} className=' hover:underline' key={index}>
                        <span className='font-bold mr-2'>{item.nameBn}</span> <span>{item.today}</span>
                        <span>{item.unit}</span> <span>    {item.change.dir === "up"
                            ? "🔺"
                            : item.change.dir === "down"
                            ? "🔽"
                            : ""}</span><span>{item.change.pct}%</span>
                                <span className= "text-gray-300">│</span>
                   </Link>
                ))}
               </MarqueeText>
                
            </div>
        </div>
    );
};

export default Marquee;