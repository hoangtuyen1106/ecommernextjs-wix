import { getWixClient } from "@/lib/wix-client.base";
import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { getCart } from "./wix-api/cart";



export default async function Navbar() {
  const cart = await getCart();

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto p-5 flex items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Wix Shop logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow Shop</span>
        </Link>
        {totalQuantity} items in your cart
      </div>
    </header>
  );
}
