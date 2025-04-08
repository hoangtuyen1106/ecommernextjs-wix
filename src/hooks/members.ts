import { updateMemberInfo, UpdateMemberInfoValues } from "@/app/wix-api/member";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUpdateMember() {
  const router = useRouter();

  return useMutation({
    mutationFn: (variables: UpdateMemberInfoValues) =>
      updateMemberInfo(wixBrowserClient, variables),
    onSuccess() {
      toast("Profile updated");
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError(error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    },
  });
}
