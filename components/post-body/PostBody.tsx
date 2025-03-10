import parse from "html-react-parser";

import "./overlayStyle.css";
import ZoomImage from "./ZoomImage";

interface PostBodyProps {
  body: string;
  blurDataMap?: { src: string; blurDataURL: string }[];
}

const PostBody = ({ body, blurDataMap }: PostBodyProps) => {
  // Fetch blurData for each image asynchronously
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;

        const blurData =
          blurDataMap &&
          blurDataMap.find(
            (data) => decodeURIComponent(data.src.replace(/&amp;/g, "&")) == src
          );
        const widthMatch = src.match(/width=(\d+)/);
        const heightMatch = src.match(/height=(\d+)/);

        return (
          <ZoomImage
            src={src}
            alt={alt}
            width={widthMatch && widthMatch[1]}
            height={heightMatch && heightMatch[1]}
            blurDataURL={blurData?.blurDataURL as string}
          />
        );
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return (
    <article className="richtext h-full mx-auto">{getParsedHtml(body)}</article>
  );
};

export default PostBody;
