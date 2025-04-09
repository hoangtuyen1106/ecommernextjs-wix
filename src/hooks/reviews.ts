import {
  createProductReview,
  CreateProductReviewValues,
} from "@/app/wix-api/reviews";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProductReview() {
  return useMutation({
    mutationFn: (values: CreateProductReviewValues) =>
      createProductReview(wixBrowserClient, values),
    onError(error) {
        console.error(error);
        if((error as any).details?.applicationError?.code === 'ReviewExists') {
          toast.error("Bạn đã đánh giá bài viết này rồi");
        } else {
          toast.error("Failed to create review. Please try again.");

        }
    }
  });
}
