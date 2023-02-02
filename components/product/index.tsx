import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { WaveSpinner } from "react-spinners-kit";

import Header from "./header";
import ImageHandler from "./GalleryImage";
import {
  AddToCart,
  ContentDropDown,
  CustomCrousal,
  Newsbar,
  SelectDropdown,
} from "@uiUtils";
import Footer from "components/Footer";
import type { ProductPageProps, VariantsProps } from "@types";
import { queries } from "@queries";
import type {
  ProductDetailProps,
  VariantProps,
  ProductSelectVariant,
} from "@types";
import ProductAdditionalDetails from "./details";
import { useDimensions } from "@hooks";
import Rating from "./Rating";


export default function Product({ product }: ProductPageProps): JSX.Element {
  const [dimension] = useDimensions();

  //@queries
  const [fetchProduct, { data: productDB, loading: fetchingProduct }] =
    useLazyQuery(queries?.fetchProduct);

  //@states
  const [productDetail, setProductDetail] = useState<ProductDetailProps>(null);
  const [productImage, setProductImage] = useState<string>(null);
  const [selectedVariants, setSelectedVariants] = useState<
    Array<ProductSelectVariant>
  >([]);
  const [profileImageLoaded, setProfileImageLoaded] = useState<boolean>(false);

  //@memoization
  const memoizeProductDetail = useMemo(() => productDetail, [productDetail]);

  const memoizeRenderGalleryImages = useMemo(
    () => renderGalleryImage(),
    [productDetail, fetchingProduct]
  );
  
  const memoizeRenderVariants = useMemo(
    () => renderVariants(),
    [fetchProduct, memoizeProductDetail?.variants, selectedVariants]
  );

  useEffect(() => {
    setProductDetail(productDB?.product);
  }, [productDB]);

  useEffect(() => {
    fetchProduct({
      variables: {
        slug: product?.slug,
      },
    });
  }, [product]);

  function renderGalleryImage() {
    const array = new Array(4).fill(null);
    const galleryImages: Array<JSX.Element> = [];

    if (fetchingProduct) {
      return array?.map((el, i) => (
        <div key={i} className="gallery-image">
          <div className="h-full w-full bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      ));
    }

    if (!memoizeProductDetail?.galleryImage?.length) return;

    galleryImages?.push(
      <ImageHandler
        handleImage={handleGalleryImage}
        imageURI={memoizeProductDetail?.imageURI}
        alt={product?.name}
      />
    );

    memoizeProductDetail?.galleryImage?.forEach((el, i) =>
      galleryImages?.push(
        <ImageHandler
          handleImage={handleGalleryImage}
          imageURI={el}
          alt={product?.name}
        />
      )
    );

    galleryImages?.push();

    return galleryImages?.map((el) => el);
  }

  function handleVariant(variant: VariantProps, variantName: string) {
    return function () {
      handleVariantImage(variant?.imageURI);

      const prev = selectedVariants;
      const filteredArr = prev.filter(
        (el, i) => el.variantName !== variantName
      );

      filteredArr.push({ ...variant, variantName });
      setSelectedVariants(filteredArr);
      setProductDetail((prev) => {
        return { ...prev, selectedVariants: filteredArr };
      });
    };
  }

  function checkVariantClicked(variant: VariantProps): boolean {
    const isExist = selectedVariants?.find((el, i) => el.id === variant.id);
    if (isExist?.id) {
      return true;
    }

    return false;
  }

  function renderVariantName(variant: VariantsProps): Function {
    return function (): string {
      const selected = variant.variants.find((el) => {
        return selectedVariants?.find((sl, i) => {
          return el.id === sl.id;
        });
      });

      return selected?.name;
    };
  }

  function renderVariants() {
    const arr = new Array(4).fill(null);

    const getSelectedVar = (id: string): boolean => {
      return selectedVariants?.find((el) => el.id === id)?.id ? true : false;
    };

    if (fetchingProduct) {
      return arr?.map((_el, i) => {
        return (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full flex h-10 rounded-md bg-gray-300 animate-pulse"></div>
          </div>
        );
      });
    }

    return memoizeProductDetail?.variants?.map((el, i) => {
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

  function handleGalleryImage(uri: string) {
    setProductImage(uri);
  }

  function handleVariantImage(uri: string) {
    setProductImage(uri);
  }

  function renderPrice(): number {
    let totalVarPrice: number = 0;

    selectedVariants?.forEach((el, i) => {
      totalVarPrice += el?.price;
    });

    return totalVarPrice + productDetail?.discount_price;
  }

  function setColorImage(): string {
    let imageUri: string = "";
    selectedVariants.forEach((el, i) => {
      if (el.variantName?.toLowerCase() === "colors") {
        imageUri = el.imageURI;
      }
    });

    return imageUri?.length ? imageUri : product?.imageURI;
  }

  function renderSku(): string {
    let sku = memoizeProductDetail?.sku;

    selectedVariants?.forEach((el) => {
      sku = `${sku}-${el.sku}`;
    });

    return sku;
  }

  return (
    <div className="w-full flex flex-col mt-10 sm:mt-20 px-sides  py-8 gap-8">
      {fetchingProduct ? (
        <div className="w-[20%] flex h-4 rounded-md animate-pulse bg-gray-300"></div>
      ) : (
        <Header
          maincategory={memoizeProductDetail?.main_category}
          subcategory={memoizeProductDetail?.sub_category}
          innercategory={memoizeProductDetail?.inner_category}
        />
      )}
      <div className="w-full flex flex-col sm:flex-row h-full gap-14 2xl:px-40">
        <div className="w-full sm:w-1/2 flex flex-col h-full gap-10">
          <div className="w-full relative bg-white h-[40rem] rounded-xl">
            <Image
              src={productImage ? productImage : product?.imageURI}
              alt={product?.name}
              fill
              className="object-contain rounded-xl"
              onLoadingComplete={() => setProfileImageLoaded(true)}
              unoptimized
            />
            {profileImageLoaded === false && (
              <div className="w-full absolute bg-white flex h-full items-center justify-center">
                <WaveSpinner color="#d1d5db" />
              </div>
            )}
          </div>
          <CustomCrousal hideBtns={memoizeRenderGalleryImages?.length >= 5}>
            {memoizeRenderGalleryImages}
          </CustomCrousal>
        </div>

        <div className=" w-full sm:w-1/2 flex flex-col h-full text-primaryText font-primary gap-4">
          <h2 className="text-md font-bold">{product?.name}</h2>
          <div className="w-[89%] flex flex-col gap-6">
            <h2 className="text-base text-justify font-primary text-primaryText/80">
              {product?.short_description}
            </h2>
            <div className="flex gap-2 items-center">
              {fetchingProduct ? (
                <div className="w-[50%] h-10 rounded-md bg-gray-300 animate-pulse"></div>
              ) : (
                <>
                  <h2 className="text-md font-bold text-primaryText">
                    ${renderPrice().toFixed(2)}
                  </h2>
                  <h2 className="text-md font-semibold text-primaryText/60 line-through">
                    $
                    {parseFloat(
                      memoizeProductDetail?.selling_price.toString()
                    ).toFixed(2)}
                  </h2>
                </>
              )}
            </div>
          </div>

          {memoizeRenderVariants?.length > 0 && (
            <div className="w-full h-1 border-b border-primaryText/80" />
          )}
          <div
            id="variant-dropdown"
            className="w-full flex flex-col gap-8 py-4"
          >
            {memoizeRenderVariants}
          </div>
          <div className="w-full h-1 border-b border-primaryText/80" />
          <div className="w-full flex py-4 gap-4 items-center">
            <AddToCart
              btnsWidth={dimension?.width > 1900 ? "20%" : "40%"}
              disabled={
                productDetail?.variants?.length !== selectedVariants?.length
              }
              //@ts-ignore
              product={{
                ...productDetail,
                ...product,
                imageURI: setColorImage(),
                sku: renderSku(),
              }}
            />
          </div>
          <div className="w-full h-1 border-b border-primaryText/80" />
          <ProductAdditionalDetails
            sku={renderSku()}
            category={memoizeProductDetail?.main_category?.name}
            tags={memoizeProductDetail?.tags?.join(",")}
            quantity={memoizeProductDetail?.quantity}
            barcode={memoizeProductDetail?.code?.toString()}
            brand={memoizeProductDetail?.brands}
            loading={fetchingProduct}
          />
          <div className="w-full h-1 border-b border-primaryText/80" />
          <ContentDropDown
            title="Product Details"
            content={memoizeProductDetail?.long_description}
          />
          <div className="w-full h-1 border-b border-primaryText/80" />
          <ContentDropDown
            title="Additional Information"
            content={memoizeProductDetail?.additional_info}
          />
          <div className="w-full h-1 border-b border-primaryText/80" />
          <ContentDropDown title="Customer Reviews" custom>
            <Rating productId={memoizeProductDetail?.id} />
          </ContentDropDown>
          <div className="w-full h-1 border-b border-primaryText/80" />
        </div>
      </div>

      <div className="w-full flex">
        <Newsbar />
      </div>
      <Footer />
    </div>
  );
}
