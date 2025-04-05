import { WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

// const wixClient = getWixClient();
// const collection = await getCollectionBySlug("featured-products");
//-------------------
// if (!collection) {
//     return null;
//   }
//   co the viet khi tach function
//   return collection || null;

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001")
      .ne("_id", "4c47a294-a8d3-a37e-d6e0-2048e0db0fb6")
      .find();

    return collections.items;
  },
);
