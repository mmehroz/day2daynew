import { Settings } from "react-slick";
import { IoIosArrowForward } from "react-icons/io";
import { useContext } from "react";
import { useDimensions } from "@hooks";

function PrevArrow({ currentSlide, slideCount, ...props }: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button {...props} className={"slide-arrow"} type="button">
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white rotate-180" />
      </div>
    </button>
  );
}

function NextArrow({ currentSlide, slideCount, ...props }: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button {...props} className={"slide-arrow-next-primary"} type="button">
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white" />
      </div>
    </button>
  );
}

function PrevArrowSecondary({
  currentSlide,
  slideCount,
  ...props
}: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button
      {...props}
      className="w-10 h-10 rounded-full hidden sm:absolute bg-orange-500  flex items-center justify-center shadow-md z-10 cursor-pointer left-10"
    >
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white rotate-180" />
      </div>
    </button>
  );
}

function NextArrowSecondary({
  currentSlide,
  slideCount,
  ...props
}: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button
      {...props}
      className="w-10 h-10 rounded-full right-10 2xl:right-32 hidden sm:absolute bg-orange-500 flex items-center justify-center shadow-md cursor-pointer"
    >
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white" />
      </div>
    </button>
  );
}

function PrevArrowSecondaryHover({
  currentSlide,
  slideCount,
  ...props
}: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button
      {...props}
      id="prevbtn-slider"
      className="w-10 h-10 rounded-full hidden sm:absolute  bg-orange-500 flex items-center justify-center shadow-md z-10 cursor-pointer left-5"
    >
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white rotate-180" />
      </div>
    </button>
  );
}

function NextArrowSecondaryHover({
  currentSlide,
  slideCount,
  ...props
}: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button
      {...props}
      id="prevbtn-slider"
      className="w-10 h-10 rounded-full right-5 2xl:right-10 absolute bg-orange-500 flex items-center justify-center shadow-md cursor-pointer"
    >
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white" />
      </div>
    </button>
  );
}

function NextArrowTwo({
  currentSlide,
  slideCount,
  ...props
}: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button
      {...props}
      className={"slide-arrow-next-primary top-[30%]"}
      type="button"
    >
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white" />
      </div>
    </button>
  );
}
function NextPrevTwo({ currentSlide, slideCount, ...props }: any): JSX.Element {
  const [dimension] = useDimensions();

  if (dimension.width < 500) {
    return <></>;
  }

  return (
    <button {...props} className={"slide-arrow top-[30%]"} type="button">
      <div className="w-full h-full items-center justify-center flex">
        <IoIosArrowForward size={20} className="text-white rotate-180" />
      </div>
    </button>
  );
}

export const mainSliderSettings: Settings = {
  className: "relative flex items-center",
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  // autoplay: true,
  nextArrow: <NextArrowSecondary />,
  prevArrow: <PrevArrowSecondary />,
};

export const settings: Settings = {
  className: "relative flex items-center",
  infinite: true,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1750,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1950,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
  swipeToSlide: true,
  autoplay: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export const sliderSettingsSecndary: Settings = {
  className: "relative flex items-center",
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
  speed: 300,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1750,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1950,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
  nextArrow: <NextArrowTwo />,
  prevArrow: <NextPrevTwo />,
};

export const sliderSettingsBannerOne: Settings = {
  className: "relative flex items-center",
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
  nextArrow: <NextArrowSecondaryHover />,
  prevArrow: <PrevArrowSecondaryHover />,
  autoplaySpeed: 5000,
};
