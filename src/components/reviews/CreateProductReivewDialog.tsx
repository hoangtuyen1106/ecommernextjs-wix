import { Dialog } from "@radix-ui/react-dialog";
import { products } from "@wix/stores";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

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
    return <DialogContent>
        <DialogHeader>
            <DialogTitle>Write a review</DialogTitle>
            <DialogDescription>Did you like this product? Share your thoughts with other customer</DialogDescription>
        </DialogHeader>
    </DialogContent>
}
