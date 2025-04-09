import { Dialog } from "@radix-ui/react-dialog";
import { products } from "@wix/stores";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductReview } from "@/hooks/reviews";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Must be au least 5 characters")
    .max(100, "Can't be longer than 100 characters")
    .or(z.literal("")),
  body: z
    .string()
    .trim()
    .min(10, "Must be at least 10 characters")
    .max(3000, "Can't be longer than 3000 characters")
    .or(z.literal("")),
  rating: z.number().int().min(1, "Please rate this product"),
});

type FormValues = z.infer<typeof formSchema>

interface CreateProductReviewDialogProps {
  product: products.Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export default function CreateProductReviewDialog({
  product,
  open,
  onOpenChange,
  onSubmitted,
}: CreateProductReviewDialogProps) {
    const form = useForm<FormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
            rating: 0
        }
    })

    const mutation = useCreateProductReview();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Write a review</DialogTitle>
        <DialogDescription>
          Did you like this product? Share your thoughts with other customer
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
