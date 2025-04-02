import { getWixClient } from "@/lib/wix-client.base";

// const wixClient = getWixClient();
// const collection = await getCollectionBySlug("featured-products");
//-------------------
// if (!collection) {
//     return null;
//   }
//   co the viet khi tach function
//   return collection || null;
export async function getCollectionBySlug(slug: string) {
    const wixClient = getWixClient();

    const { collection } =
    await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
}