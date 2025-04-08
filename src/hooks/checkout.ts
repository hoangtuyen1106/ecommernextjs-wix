import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProduct,
  GetCheckoutUrlForProductValues,
} from "@/app/wix-api/checkout";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useState } from "react";
import { toast } from "sonner";

export function useCartCheckout() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.log(error);

      toast.error("Failed to load checkout. Please try again.");
    }
  }
  return { startCheckoutFlow, pending };
}

export function useQuickBuy() {
  const [pending, setPending] = useState(false);
  async function startCheckoutFlow(values: GetCheckoutUrlForProductValues) {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForProduct(
        wixBrowserClient,
        values,
      );
      window.location.href = checkoutUrl;
    } catch (error) {
      setPending(false);
      console.log(error);
      toast.error("Failed to load checkout. Please try again.");
    }
  }

  return { startCheckoutFlow, pending };
}
