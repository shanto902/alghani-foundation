import React from "react";
import RecognitionSlider from "../slider/RecognitionSlider";
import { TRecognition, TRecognitionBlock } from "@/interfaces";
import { getPlaceholderImage } from "@/lib/getBlurData";

const RecognitionBlock = async ({ block }: { block: TRecognitionBlock }) => {
  const blurDataMap = await Promise.all(
    (block.item.recognitions || []).map(async (src: TRecognition) => ({
      src: src.recognition_id,
      blurDataURL: await getPlaceholderImage(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${src?.recognition_id?.image}`
      ),
    }))
  );

  return (
    <div>
      <RecognitionSlider block={blurDataMap} />
    </div>
  );
};

export default RecognitionBlock;
