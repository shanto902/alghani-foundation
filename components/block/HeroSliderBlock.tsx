import Slider from "react-slick";

import { THeroSliderBlock, TSlider } from "@/interfaces";

import HeroSlider from "../slider/HeroSlider";
import { getPlaceholderImage } from "@/lib/getBlurData";

export type TSliderBlurData = {
  src: TSlider;
  blurDataURL: string;
};

const HeroSliderBlock = async ({ block }: { block: THeroSliderBlock }) => {
  const blurDataMap = await Promise.all(
    (block.item.sliders || []).map(async (src: TSlider) => {
      const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}${src.sliders_id.image}`;
      const blurDataURL = await getPlaceholderImage(imageUrl);

      return { src, blurDataURL };
    })
  );

  return (
    <section>
      <HeroSlider block={blurDataMap as TSliderBlurData[]} />
    </section>
  );
};

export default HeroSliderBlock;
