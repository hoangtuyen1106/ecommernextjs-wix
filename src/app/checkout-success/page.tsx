import { getWixServerClient } from "@/lib/wix-client.server";
import { Metadata } from "next";
import { getOrder } from "../wix-api/orders";
import { notFound } from "next/navigation";
import { getLoggedInMember } from "../wix-api/member";
import Order from "@/components/Order";
import Link from "next/link";
import ClearCart from "./ClearCart";

export const metadata: Metadata = {
  title: "Checkout success",
};

interface PageProps {
  searchParams: Promise<{ orderId: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { orderId } = await searchParams;
  const wixClient = await getWixServerClient();

  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  if (!order) notFound();

  const orderCreatedDate = order._createdDate
    ? new Date(order._createdDate)
    : null;

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1 className="text-3xl font-bold">We received your order!</h1>
      <p>A summary of your order was sent to your email address.</p>
      <h2 className="text-2xl font-bold">Order details</h2>
      <Order order={order} />
      {loggedInMember && (
        <Link href="/profile" className="text-primary hover: block underline">
          View all your orders
        </Link>
      )}
      
      {orderCreatedDate &&
        orderCreatedDate.getTime() > Date.now() - 60_000 * 5 && <ClearCart />}
    </main>
  );
}
