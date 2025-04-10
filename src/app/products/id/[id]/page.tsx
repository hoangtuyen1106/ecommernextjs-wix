import { getProductById } from "@/app/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: { id: string };
  // Sửa kiểu của searchParams
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  if (params.id === "someId") {

    redirect(`/products/leather-shoes-3?${new URLSearchParams(searchParams as any)}`);
  }

  const wixClient = await getWixServerClient();
  const product = await getProductById(wixClient, params.id);

  if (!product) notFound();

  redirect(`/products/${product.slug}?${new URLSearchParams(searchParams as any)}`);
}