import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "../wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";

export default async function Layout({children}: {children: React.ReactNode}) {

    const wixClient = await getWixServerClient();
    const collections = await getCollections(wixClient);

    return <SearchFilterLayout collections={collections}>
        {children}
    </SearchFilterLayout>
}