import { getProductById } from "@/app/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";
import { notFound, redirect } from "next/navigation";
// Không cần interface PageProps

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] } }) {
  if (params.id === "someId") {
    redirect(`/products/leather-shoes-3?${new URLSearchParams(searchParams)}`);
  }

  const wixClient = await getWixServerClient();
  const product = await getProductById(wixClient, params.id);

  if (!product) notFound();

  redirect(`/products/${product.slug}?${new URLSearchParams(searchParams)}`);
}
