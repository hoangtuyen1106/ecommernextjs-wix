import {
  generateOAuthData,
  getLoginUrl,
  getLogoutUrl,
} from "@/app/wix-api/auth";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constants";

export default function useAuth() {
  const pathname = usePathname();

  async function login() {
    try {
      const oAuthData = await generateOAuthData(wixBrowserClient, pathname);

      Cookies.set(WIX_OAUTH_DATA_COOKIE, JSON.stringify(oAuthData), {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 60 * 10 * 1000),
      });

      const redirectUrl = await getLoginUrl(wixBrowserClient, oAuthData);

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in. Please try again.");
    }
  }

  async function logout() {
    try {
      const logoutUrl = await getLogoutUrl(wixBrowserClient);

      Cookies.remove(WIX_SESSION_COOKIE);

      window.location.href = logoutUrl;
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again.");
    }
  }

  return { login, logout };
}
