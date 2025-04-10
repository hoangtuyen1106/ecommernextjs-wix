import { getProductById } from "@/app/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: { id: string };
  searchParams: any;
}

// @ts-expect-error: local PageProps does not match generated types
export default async function Page({ params, searchParams }: PageProps) {
  if (params.id === "someId") {
    redirect(`/products/leather-shoes-3?${new URLSearchParams(searchParams)}`);
  }

  const wixClient = await getWixServerClient();
  const product = await getProductById(wixClient, params.id);

  if (!product) notFound();

  redirect(`/products/${product.slug}?${new URLSearchParams(searchParams)}`);
}
