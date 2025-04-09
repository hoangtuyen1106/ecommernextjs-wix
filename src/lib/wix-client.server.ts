import { ApiKeyStrategy, createClient, Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { cache } from "react";
import { files } from "@wix/media";
import { env } from "@/env";

export const getWixServerClient = cache(async () => {
  let tokens: Tokens | undefined;

  try {
    const cookieStore = await cookies();
    tokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || "{}");
  } catch (error) {}

  return getWixClient(tokens);
});

export const getWixAdminClient = cache(() => {
  const wixClient = createClient({
    modules: {
      files,
    },
    auth: ApiKeyStrategy({
      apiKey: env.WIX_API_KEY,
      siteId: env.NEXT_PUBLIC_WIX_SITE_ID,
    }),
  });

  return wixClient;
});
