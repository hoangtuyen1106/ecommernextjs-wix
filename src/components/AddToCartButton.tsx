import { products } from "@wix/stores";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { addToCart } from "@/app/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client.browser";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() =>
        addToCart(wixBrowserClient, {
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
    >
      Add to cart
    </Button>
  );
}
