import { products } from "@wix/stores";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductReview } from "@/hooks/reviews";
import { Label } from "../ui/label";
import WixImage from "../WixImage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import LoadingButton from "../LoadingButton";

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

type FormValues = z.infer<typeof formSchema>;

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
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      rating: 0,
    },
  });

  const mutation = useCreateProductReview();

  async function onSubmit({ title, body, rating }: FormValues) {
    if (!product._id) {
      throw Error("Product ID is missing");
    }
    mutation.mutate({
      productId: product._id,
      title,
      body,
      rating,
    }, {
      onSuccess: onSubmitted,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
          <DialogDescription>
            Did you like this product? Share your thoughts with other customer
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Product</Label>
            <div className="flex items-center gap-3">
              <WixImage
                mediaIdentifier={product.media?.mainMedia?.image?.url}
                width={50}
                height={50}
              />
              <span className="font-bold">{product.name}</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell others about your experience ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Write a detailed review to help ohter customers.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <LoadingButton type="submit" loading={mutation.isPending}>
                Submit
              </LoadingButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
