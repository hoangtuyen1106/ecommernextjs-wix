import { getCollectionBySlug } from "@/app/wix-api/collections";
import { queryProducts } from "@/app/wix-api/products";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;
  const wixClient = await getWixServerClient();
  const collection = await getCollectionBySlug(wixClient, slug);

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      images: banner ? [{ url: banner.url }] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const wixClient = await getWixServerClient();
  const collection = await getCollectionBySlug(wixClient, slug);

  if (!collection?._id) notFound();
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Products</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <Products collectionId={collection._id} />
      </Suspense>
    </div>
  );
}

interface ProductsProps {
  collectionId: string;
}

async function Products({ collectionId }: ProductsProps) {
  await delay(2000);

  const wixClient = await getWixServerClient();
  const collectionProducts = await queryProducts(wixClient, {
    collectionIds: collectionId,
  });

  if (!collectionProducts.length) notFound();

  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {collectionProducts.items.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
