import parse from "html-react-parser";

import "./overlayStyle.css";
import ZoomImage from "./ZoomImage";

const PostBody = ({ body, id }: { body: string; id?: string }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return <ZoomImage src={src} alt={alt} id={id} />;
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return <div className=" richtext">{getParsedHtml(body)}</div>;
};

export default PostBody;
