import { getProductBySlug } from "@/app/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

type PageProps = Promise<{ slug: string }>;

export default async function Page({ params }: { params: PageProps }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}