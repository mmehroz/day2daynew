import {
  memo,
  useContext,
  useMemo,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { WaveSpinner } from "react-spinners-kit";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

import { UiConext } from "@context";
import { queries } from "@queries";
import { SearchProductProps } from "@types";

import TypeSomething from "../../assets/images/type-something.svg";
import NoData from "../../assets/images/search-empty.svg";

function Search(): JSX.Element {
  //@queires
  const [searchProducts, { loading: searching, data: searchDataDB }] =
    useLazyQuery(queries.searchProducts);

  //@contexts
  const { searchState, hideSearch, headerState } = useContext(UiConext);

  //@states
  const [searchText, setSearchText] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<SearchProductProps>>([]);

  //@hooks
  useEffect(() => {
    setProducts(searchDataDB?.searchProducts);
  }, [searchDataDB]);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      if (e?.target?.value?.length < 2) return;

      let timeoutid: any;

      if (timeoutid) {
        clearTimeout(timeoutid);
      }

      timeoutid = setTimeout(() => {
        searchProducts({
          variables: {
            name: e.target.value,
          },
        });
      }, 1000);

      return () => {
        clearTimeout(timeoutid);
      };
    },
    [searchText]
  );

  const onFocus = useCallback(() => {
    setActive(true);
  }, [active]);

  const onBlur = useCallback(() => {
    setActive(false);
  }, [active]);

  const render = () => {
    const array = new Array(30).fill(null);
    if (searching) {
      return array?.map((el, i) => (
        <div
          key={i}
          className="w-full  h-28 flex items-center hover:scale-[102%] hover:bg-gray-200 px-2 rounded-md transition duration-200 cursor-pointer py-2"
        >
          <div className="w-24 h-24 rounded-md p-1 bg-gray-300  animate-pulse"></div>
          <div className="flex flex-col w-full h-full py-2 px-4 gap-2">
            <div className="w-32 h-3 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-40 h-3 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-20 h-3 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-24 h-3 rounded-md bg-gray-300 animate-pulse" />
          </div>
        </div>
      ));
    }

    if (searchText?.length < 2) {
      return (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="w-[20rem] h-[20rem] relative">
            <Image src={TypeSomething} fill alt="type-something" unoptimized />
          </div>
          <h2 className="font-primary font-bold text-primaryText/60">
            Type Something..
          </h2>
        </div>
      );
    }

    if (products?.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="w-[20rem] h-[20rem] relative">
            <Image src={NoData} fill alt="type-something" unoptimized />
          </div>
          <h2 className="font-primary font-bold text-primaryText/60">
            No Data Found Try something different
          </h2>
        </div>
      );
    }

    return products?.map((el, i) => (
      <MemoizeProduct {...el} key={i} hideSearch={handleHideSearch} />
    ));
  };

  const handleHideSearch = useCallback(() => {
    hideSearch();
    setSearchText("");
  }, [searchState]);

  return (
    <AnimatePresence>
      {searchState && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: "0%",
          }}
          exit={{
            opacity: 0,
          }}
          className="w-screen bg-black/40 flex h-screen absolute z-[9999999999] py-8 "
        >
          <motion.div
            initial={{
              y: "-30%",
            }}
            animate={{
              y: "0%",
            }}
            exit={{
              y: "-30%",
            }}
            className="w-full h-full flex flex-col items-center"
          >
            <div className="w-[90%]  md:w-[60%] h-14  bg-backgroundColorSecondary rounded-lg flex transition items-center gap-4 relative">
              <div
                className={`w-16 h-full  flex items-center justify-center rounded-l-lg transition duration-200 bg-gradient-to-tr to-primaryText from-black`}
              >
                <BiSearch size={22} className="text-white/80" />
              </div>
              <input
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={handleSearch}
                value={searchText}
                className=" w-[65%] sm:w-[82%] h-full bg-backgroundColorSecondary outline-none font-primary font-semibold text-sx text-primaryText"
                placeholder="Search"
              />
              <IoClose
                onClick={hideSearch}
                size={22}
                className="text-primaryText/60 hover:scale-125 transition duration-200 hover:text-mainSecondary cursor-pointer"
              />
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: "-5%",
                    }}
                    animate={{
                      opacity: 1,
                      y: "5%",
                    }}
                    exit={{
                      opacity: 0,
                      y: "-5%",
                    }}
                    className="h-[30rem] md:h-[20rem] lg:h-[30rem] 2xl:h-[40rem] rounded-lg top-12 md:top-10 w-full flex flex-col absolute bg-backgroundColorSecondary p-5 gap-5 overflow-y-scroll"
                  >
                    {render()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchProduct({
  slug,
  name,
  discount_price,
  selling_price,
  short_description,
  imageURI,
  hideSearch,
}: SearchProductProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const onImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, [imageLoaded]);

  return (
    <Link onClick={hideSearch} passHref href={`/product/${slug}`}>
      <div className="w-full  h-28 flex items-center hover:scale-[102%] hover:bg-gray-200 px-2 rounded-md transition duration-200 cursor-pointer py-2">
        <div className="relative w-24 h-24 rounded-full p-1">
          <Image
            src={imageURI}
            fill
            alt="product-image"
            className="object-cover rounded-md bg-white"
            onLoadingComplete={onImageLoaded}
            unoptimized
          />

          {imageLoaded === false && (
            <div className="w-full absolute rounded-md bg-white flex h-full items-center justify-center">
              <WaveSpinner color="#d1d5db" size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full h-full py-2 px-4 gap-1 text-primaryText font-semibold font-primary text-sx">
          <h2 className="hover:text-mainSecondary">{name}</h2>
          <h2 className="text-primaryText/60">
            {/* 69 */}
            {short_description?.length > 60
              ? short_description?.slice(0, 60) + ".."
              : short_description}
          </h2>
          <div className="flex gap-2">
            <h2 className="text-sx font-bold text-mainSecondary font-primary">
              ${discount_price?.toFixed(2)}
            </h2>
            <h2 className="text-sx font-bold text-mainSecondary font-primary line-through">
              ${selling_price?.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

const MemoizeProduct = memo(SearchProduct);

export default memo(Search);
