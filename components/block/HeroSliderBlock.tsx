import Slider from "react-slick";

import { THeroSliderBlock, TSlider } from "@/interfaces";

import HeroSlider from "../slider/HeroSlider";
import { getBlurData } from "@/lib/getBlurData";

export type TSliderBlurData = {
  src: TSlider;
  blurDataURL: string;
};

const HeroSliderBlock = async ({ block }: { block: THeroSliderBlock }) => {
  const blurDataMap = await Promise.all(
    (block.item.sliders || []).map((src: TSlider) =>
      getBlurData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${src.sliders_id.image}`
      ).then((blurDataURL) => ({
        src,
        blurDataURL,
      }))
    )
  );

  return (
    <section>
      <HeroSlider block={blurDataMap as TSliderBlurData[]} />
    </section>
  );
};

export default HeroSliderBlock;
