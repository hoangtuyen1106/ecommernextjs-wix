import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/app/wix-api/backInStockNotifications";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBackInStockNotificationRequest() {
  return useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) =>
      createBackInStockNotificationRequest(wixBrowserClient, values),
    onError(error) {
      console.error(error);
      if (
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast.error("You are already subcribed to this product.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    },
  });
}
