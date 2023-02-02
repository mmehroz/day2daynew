import { memo, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import memoize from "fast-memoize";
import Link from "next/link";
import { AiTwotoneStar } from "react-icons/ai";

import { ProductPopupContext } from "@context";
import { WaveSpinner } from "react-spinners-kit";
import SelectDropdown from "./SelectDropdown";
import type {
  VariantsProps,
  ProductSelectVariant,
  VariantProps,
  ProductAddToCart,
} from "@types";
import { useMemo } from "react";
import { useCallback } from "react";
import ButtonIncreament from "./ButtonIncreament";
import ButtonPrimary from "./ButtonPrimary";
import AddToCart from "./AddToCart";

function ProductPopup(): JSX.Element {
  const { dispatchPopup, loadingPopup, product } =
    useContext(ProductPopupContext);

  //@states
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [selectedVariants, setSelectedVariants] = useState<
    Array<ProductSelectVariant>
  >([]);
  const [productImage, setProductImage] = useState<string>(null);
  const [selectedProduct, setSelectedProdut] = useState<ProductAddToCart>(null);

  //@memoization
  const memoizeImageLoaded = useMemo(() => imageLoaded, [imageLoaded]);
  const memoizeSelectedVariants = useMemo(
    () => selectedVariants,
    [selectedVariants]
  );
  const memoizeProductImage = useMemo(() => productImage, [productImage]);

  useEffect(() => {
    setSelectedProdut({
      ...product,
      selectedVariants: null,
      quantity: product?.quantity,
    });
  }, [product]);

  const handleVariantImage = useCallback(
    (uri: string) => setProductImage(uri),
    []
  );
  const checkVariantClicked = useCallback(
    (variant: VariantProps): boolean => {
      const isExist = memoizeSelectedVariants?.find(
        (el, i) => el.id === variant.id
      );
      if (isExist?.id) {
        return true;
      }

      return false;
    },
    [memoizeSelectedVariants]
  );
  const handleVariant = useCallback(
    memoize((variant: VariantProps, variantName: string) => () => {
      handleVariantImage(variant?.imageURI);

      const prev = memoizeSelectedVariants;
      const filteredArr = prev.filter(
        (el, i) => el.variantName !== variantName
      );
      filteredArr.push({ ...variant, variantName });
      setSelectedVariants(filteredArr);
      setSelectedProdut((prev) => {
        return { ...prev, selectedVariants: filteredArr };
      });
    }),
    [memoizeSelectedVariants]
  );

  const renderVariantName = useCallback(
    memoize((variant: VariantsProps) => (): string => {
      const selected = variant.variants.find((el) => {
        return memoizeSelectedVariants?.find((sl, i) => {
          return el.id === sl.id;
        });
      });

      return selected?.name;
    }),
    [memoizeSelectedVariants]
  );

  function renderVariants() {
    const arr = new Array(4).fill(null);

    const getSelectedVar = (id: string): boolean => {
      return selectedVariants?.find((el) => el.id === id)?.id ? true : false;
    };

    if (loadingPopup) {
      return arr?.map((_el, i) => {
        return (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full flex h-10 rounded-md bg-gray-300 animate-pulse"></div>
          </div>
        );
      });
    }

    return product?.variants?.map((el, i) => {
      if (el?.type === "COLORS") {
        return (
          <div key={el?.id} className="flex flex-col gap-3">
            <h2 className="text-sm font-primary text-primaryText font-semibold">
              {el?.name}
            </h2>
            <div key={el?.id} className="flex gap-2 items-center">
              {el?.variants?.map((eel, i) => (
                <div
                  key={i}
                  onClick={handleVariant(eel, el.name)}
                  style={{
                    backgroundColor: eel?.name,
                    scale: checkVariantClicked(eel) ? "140%" : "100%",
                  }}
                  className="w-5 h-5 rounded-full bg-primaryText cursor-pointer hover:scale-125 transition duration-200 "
                />
              ))}
            </div>
          </div>
        );
      }
      return (
        <SelectDropdown
          type={el?.type}
          key={el?.id}
          title={el?.name}
          selected={renderVariantName(el)() || `Selected ${el.name}`}
        >
          {el?.variants?.map((eel, i) => (
            <div
              key={i}
              onClick={handleVariant(eel, el.name)}
              className={`px-4 flex p-2 hover:scale-110 ${
                getSelectedVar(eel.id)
                  ? "bg-gradient-to-r from-main to-mainSecondary text-white"
                  : "bg-white border border-orange-500 text-slate-600"
              } rounded-md transition duration-150 cursor-pointer`}
            >
              <h2 className="font-primary text-base select-none font-semibold">
                {eel?.name}
              </h2>
            </div>
          ))}
        </SelectDropdown>
      );
    });
  }

  function renderPrice(): number {
    let totalVarPrice: number = 0;

    memoizeSelectedVariants?.forEach((el, i) => {
      totalVarPrice += el?.price;
    });

    return totalVarPrice + product?.discount_price;
  }

  return (
    <>
      <div className="w-[40%] bg-white h-full relative rounded-l-xl">
        {loadingPopup ? (
          <div className="w-full h-full bg-gray-300 rounded-l-xl animate-pulse" />
        ) : (
          <>
            <Image
              src={
                memoizeProductImage ? memoizeProductImage : product?.imageURI
              }
              alt={product?.name}
              className="object-cover p-4 rounded-xl"
              fill
              onLoadingComplete={() => setImageLoaded(true)}
              unoptimized
            />

            {memoizeImageLoaded === false && (
              <div className="w-full absolute bg-white flex h-full items-center justify-center">
                <WaveSpinner color="#d1d5db" />
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-[60%] flex flex-col h-full overflow-y-scroll py-6 px-10 gap-5 relative justify-between hidescrollbar">
        <div className="flex flex-col gap-4 -mt-2">
          <div className="absolute right-3 top-3">
            <div
              onClick={dispatchPopup}
              className="w-8 h-8 cursor-pointer hover:scale-110 duration-200 transition rounded-full bg-gray-300 flex items-center justify-center"
            >
              <IoClose />
            </div>
          </div>
          {loadingPopup ? (
            <div className="w-[90%] h-6 bg-gray-300 animate-pulse rounded-md" />
          ) : (
            <>
              <h2
                title={product?.name}
                className="text-md font-semibold text-primaryText font-primary w-[90%]"
              >
                {product?.name?.slice(0, 34)}
              </h2>
              <div className="flex text-md text-gray-300 items-center -mt-2">
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <div className="ml-4 flex text-sx font-semibold text-gray-600 gap-4">
                  <h2>0 Reviews</h2>
                  <h2>|</h2>
                  <Link
                    onClick={dispatchPopup}
                    passHref
                    href={`/product/${product?.slug}`}
                  >
                    <h2>Write a review</h2>
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 -mt-2">
            {loadingPopup ? (
              <div className="w-full flex gap-2">
                <div className="w-[20%] h-10 rounded-md bg-gray-300 animate-pulse" />
                <div className="w-[30%] h-10 rounded-md bg-gray-300 animate-pulse" />
              </div>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-[40px] font-semibold text-primaryText/90 font-primary">
                  ${parseFloat(renderPrice()?.toString()).toFixed(2)}
                </h2>
                <div className="flex gap-2 items-center">
                  <h2 className="text-sm font-bold text-primaryText/60 line-through font-primary">
                    ${parseFloat(product?.selling_price?.toString()).toFixed(2)}
                  </h2>
                  <h2 className="text-sx font-bold text-green-500/60 font-primary ml-10">
                    You Save{" "}
                    {(
                      ((parseFloat(product?.selling_price?.toString()) -
                        parseFloat(product?.discount_price?.toString())) /
                        parseFloat(product?.selling_price?.toString())) *
                      100
                    ).toFixed(0)}
                    %
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {loadingPopup ? null : (
            <>
              <div className="w-[50%] flex justify-between items-center font-semibold ">
                <h2 className="w-[40%]">Brand</h2>
                <div className="h-4 w-1 rounded-full border-l bg-gray-300" />
                <Link
                  onClick={dispatchPopup}
                  className="w-[40%]"
                  passHref
                  href={`/brand/${product?.brands?.category?.slug}/${product?.brands?.slug}`}
                >
                  <h2 className="text-gray-500 ">{product?.brands?.name}</h2>
                </Link>
              </div>

              <div className="w-[50%] flex justify-between items-center font-semibold text-gray-700 ">
                <h2 className="w-[40%]">Availability</h2>
                <div className="h-4 w-1 rounded-full border-l bg-gray-300" />
                <h2 className="text-green-500 w-[40%] ">
                  {product?.quantity > 0 ? "In Stock" : "Out Of Stock"}
                </h2>
              </div>
            </>
          )}
        </div>

        {renderVariants()?.length ? (
          <div className="flex flex-col gap-2">
            {loadingPopup ? (
              <>
                <div className="w-24 h-6 rounded-md bg-gray-300 animate-pulse mt-2" />
                <div className="w-[90%] h-10 rounded-md bg-gray-300 animate-pulse " />
                <div className="w-24 h-6 rounded-md bg-gray-300 animate-pulse mt-2" />
                <div className="w-[90%] h-10 rounded-md bg-gray-300 animate-pulse " />
              </>
            ) : (
              <div
                id="variant-dropdown"
                className="w-full flex flex-col gap-8 py-4"
              >
                {renderVariants()}
              </div>
            )}
          </div>
        ) : null}

        {loadingPopup ? (
          <div className="flex flex-col gap-2">
            <div className="w-[80%] h-2 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-[60%] h-2 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-[70%] h-2 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-[90%] h-2 rounded-md bg-gray-300 animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-primary text-primaryText text-justify font-bold ">
              Description
            </h2>
            <h2 className="text-base font-primary text-primaryText text-justify">
              {product?.short_description?.slice(0, 53) + " .."}
            </h2>
          </div>
        )}
        <div>
          <div className="flex flex-col gap-2">
            {loadingPopup ? (
              <div className="flex gap-2">
                <div className="w-[30%] h-10 rounded-md bg-gray-300 animate-pulse" />
                <div className="w-[50%] h-10 rounded-md bg-gray-300 animate-pulse" />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 mt-10">
            {loadingPopup ? (
              <div className="flex gap-2 ">
                <div className="w-[90%] h-14 rounded-md bg-gray-300 animate-pulse" />
              </div>
            ) : (
              <div className="w-full flex items-center gap-2 flex-col">
                <div className="flex gap-2 w-full">
                  <AddToCart
                    disabled={
                      product?.variants?.length !== selectedVariants?.length
                    }
                    product={{ ...selectedProduct }}
                    btnsWidth="50%"
                  />
                </div>
                <div className="w-full">
                  <Link passHref href={`/product/${product?.slug}`}>
                    <ButtonPrimary
                      onClick={dispatchPopup}
                      title="View Details"
                      style={{
                        width: "100%",
                        color: "white",
                      }}
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ProductPopup);
