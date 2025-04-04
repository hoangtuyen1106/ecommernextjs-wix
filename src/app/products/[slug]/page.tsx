import { getProductBySlug } from "@/app/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { stripTags } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";

type PageProps = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageProps }) {
  const { slug } = await params;

  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: stripTags(product.description),
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: { params: PageProps }) {
  const { slug } = await params;
  const product = await getProductBySlug(getWixServerClient(), slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
    </main>
  );
}
