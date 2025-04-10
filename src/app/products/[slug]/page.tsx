import { getProductBySlug, getRelatedProducts } from "@/app/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { stripTags } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { Suspense } from "react";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@wix/stores";
import { getLoggedInMember } from "@/app/wix-api/member";
import CreateProductReviewButton from "@/components/reviews/CreateProductReviewButton";
import ProductReviews, {
  ProductReviewsLoadingSkeleton,
} from "./ProductReviews";
import { getProductReviews } from "@/app/wix-api/reviews";

type PageProps = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageProps }) {
  const { slug } = await params;

  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: stripTags(product.description || ""),
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
  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <hr />
      <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <RelatedProduct productId={product._id} />
      </Suspense>
      <hr />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Buyer reviews</h2>
        <Suspense fallback={<ProductReviewsLoadingSkeleton />}>
          <ProductReviewSection product={product} />
        </Suspense>
      </div>
    </main>
  );
}

interface RelatedProductProps {
  productId: string;
}

async function RelatedProduct({ productId }: RelatedProductProps) {
  const wixClient = await getWixServerClient();
  const relatedProducts = await getRelatedProducts(wixClient, productId);
  if (!relatedProducts.length) return null;
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[26rem] w-full" />
        ))}
      </div>
    </div>
  );
}

interface ProductReviewSectionProps {
  product: products.Product;
}
async function ProductReviewSection({ product }: ProductReviewSectionProps) {
  if (!product._id) return null;
  const wixClient = await getWixServerClient();

  const loggedInMember = await getLoggedInMember(wixClient);

  const existingReview = loggedInMember?.contactId
    ? (
        await getProductReviews(wixClient, {
          productId: product._id,
          contactId: loggedInMember.contactId,
        })
      ).items[0]
    : null;

  return (
    <div className="space-y-5">
      <CreateProductReviewButton
        product={product}
        loggedInMember={loggedInMember}
        hasExistingReview={!!existingReview}
      />
      <ProductReviews product={product} />
    </div>
  );
}
