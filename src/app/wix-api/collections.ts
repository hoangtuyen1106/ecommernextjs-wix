import { getWixClient, WixClient } from "@/lib/wix-client.base";

// const wixClient = getWixClient();
// const collection = await getCollectionBySlug("featured-products");
//-------------------
// if (!collection) {
//     return null;
//   }
//   co the viet khi tach function
//   return collection || null;
export async function getCollectionBySlug(wixClient: WixClient, slug: string) {
  const { collection } = await wixClient.collections.getCollectionBySlug(slug);

  return collection || null;
}
