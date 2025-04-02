import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

// Kế thừa tất cả thuộc tính <img> trừ src, width, height, alt.
// Bắt buộc có mediaIdentifier (có thể là URL hoặc ID).
// Có thể có placeholder và alt.
// Hỗ trợ hai chế độ:
// - scaleToFill là true hoặc không khai báo → yêu cầu width và height.
// - scaleToFill là false → không cần width, height.

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill: false;
      }
  );

//   Nếu mediaIdentifier có giá trị (tức là có ảnh):
//   -Kiểm tra scaleToFill:
//     - Nếu scaleToFill === true hoặc không được truyền (undefined), dùng wixMedia.getScaledToFillImageUrl để lấy ảnh có kích thước phù hợp với width và height.
//     - Nếu scaleToFill === false, dùng wixMedia.getImageUrl để lấy URL ảnh gốc.
//     - Nếu mediaIdentifier không có giá trị, dùng ảnh placeholder.
//   Chức năng của wixMedia.getScaledToFillImageUrl và wixMedia.getImageUrl:
//   - Đây có thể là hàm của thư viện hoặc API giúp tạo URL ảnh có kích thước phù hợp.
//   - getScaledToFillImageUrl: Lấy ảnh đã được crop hoặc scale theo tỷ lệ (scaleToFill).
//   - getImageUrl: Lấy ảnh gốc mà không cần chỉnh sửa.


// <WixImage 
//   mediaIdentifier="abc123"
//   width={500}
//   height={300}
//   scaleToFill={true}
// />
// Hiển thị ảnh có kích thước phù hợp với khung 500x300.
// wixMedia.getScaledToFillImageUrl("abc123", 500, 300, {});

// <WixImage 
//   mediaIdentifier="xyz789"
//   scaleToFill={false}
// />
// Hiển thị ảnh gốc, không bị resize.
// wixMedia.getImageUrl("xyz789").url;


// <WixImage alt="Default Image" />
// Hiển thị ảnh mặc định /placeholder.png

export default function WixImage({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) {
  const imageUrl = mediaIdentifier
    ? props.scaleToFill || props.scaleToFill === undefined
      ? wixMedia.getScaledToFillImageUrl(
          mediaIdentifier,
          props.width,
          props.height,
          {},
        )
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;
  return <img src={imageUrl} alt={alt || ""} {...props} />;
}
