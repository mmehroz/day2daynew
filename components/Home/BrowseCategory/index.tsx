import Slider from "react-slick";

import { CategoryCard, settings } from "@uiUtils";

const data: Array<{ name: string; imageURI: string; slug: string }> = [
  {
    imageURI:
      "https://portal.day2daywholesale.com/public/assets/img/category/Smoke%20Shop-01.svg",
    name: "Smoke Shop",
    slug: "smoke-shop",
  },
  {
    imageURI:
      "https://portal.day2daywholesale.com/public/assets/img/category/Devices-01.svg",
    name: "Device",
    slug: "devices",
  },
  {
    imageURI:
      "https://portal.day2daywholesale.com/public/assets/img/category/Disposable-01.svg",
    name: "Disposable",
    slug: "disposable",
  },
  {
    imageURI:
      "https://portal.day2daywholesale.com/public/assets/img/category/E%20Liquid-01.svg",
    name: "E-Liquids",
    slug: "e-liquids",
  },
  {
    imageURI:
      "https://portal.day2daywholesale.com/public/assets/img/category/Accessories-01.svg",
    name: "Accessories",
    slug: "Accessories",
  },
];

export default function IndexPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-semibold text-primaryText/95 text-2xl font-primary">
        Browse Categories
      </h2>
      <Slider {...settings}>
        <div>
          <CategoryCard {...data[0]} />
        </div>
        <div>
          <CategoryCard {...data[1]} />
        </div>
        <div>
          <CategoryCard {...data[2]} />
        </div>
        <div>
          <CategoryCard {...data[3]} />
        </div>
        <div>
          <CategoryCard {...data[4]} />
        </div>
        <div>
          <CategoryCard {...data[0]} />
        </div>
        <div>
          <CategoryCard {...data[1]} />
        </div>
        <div>
          <CategoryCard {...data[2]} />
        </div>
        <div>
          <CategoryCard {...data[3]} />
        </div>
      </Slider>
    </div>
  );
}
