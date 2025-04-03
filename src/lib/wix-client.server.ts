import { Tokens } from "@wix/sdk";
import Cookies from "js-cookie";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import { cache } from "react";

export const getWixServerClient = cache(() => {
  let tokens: Tokens | undefined;

  try {
    tokens = JSON.parse(Cookies.get(WIX_SESSION_COOKIE) || "{}");
  } catch (error) {}

  return getWixClient(tokens);
});
