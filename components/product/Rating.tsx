import {
  useState,
  memo,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { AiFillStar } from "react-icons/ai";

import { queries } from "@queries";
import { ButtonPrimary } from "@uiUtils";
import { UiConext } from "../../context/uiContext";
import { UserContext } from "../../context/userContext";
import { ProductReviews } from "@types";
import { FaUserAlt } from "react-icons/fa";

function Rating({ productId }: { productId: string }): JSX.Element {
  const { showModal, showLogin } = useContext(UiConext);
  const { user } = useContext(UserContext);

  const [createReview, { loading: creatingReview }] = useMutation(
    queries.createReview
  );

  const [fetchReviews, { data, loading: fetchingReviews }] = useLazyQuery(
    queries.productReviews,
    {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    }
  );

  //@states
  const [stars, setStars] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<Array<ProductReviews>>([]);

  //@memoize
  const memoizeStars = useMemo(() => stars, [stars]);
  const memoizeReview = useMemo(() => review, [review]);
  const memoizeReviews = useMemo(() => reviews, [reviews]);

  useEffect(() => {
    if (!productId) return;
    fetchReviews({
      variables: {
        productId: productId,
      },
    });
    // console.log("Rating Renders");
  }, [productId]);

  useEffect(() => {
    setReviews(data?.productreviews);
  }, [data]);

  function renderStars() {
    const starsData = [
      { 0: false },
      { 1: false },
      { 2: false },
      { 3: false },
      { 4: false },
    ];

    return starsData.map((el, i) => {
      if (memoizeStars[i]) {
        return (
          <AiFillStar
            key={i}
            size={20}
            className="text-orange-500 cursor-pointer"
            onMouseEnter={starHover(i.toString())}
            onMouseLeave={leaveHover(i.toString())}
            onClick={handleStarClick(i.toString())}
          />
        );
      }

      return (
        <AiFillStar
          key={i}
          size={20}
          className="cursor-pointer text-gray-400"
          onMouseEnter={starHover(i.toString())}
        />
      );
    });
  }

  const handleStarClick = (starName: string) => () => {
    let data = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    };

    for (let i = 0; i <= parseInt(starName); i++) {
      data[i] = true;
    }

    setStars({ ...data });
  };

  const starHover = (starName: string) => () => {
    let data = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    };

    for (let i = 0; i <= parseInt(starName); i++) {
      data[i] = true;
    }

    setStars(data);
  };

  const leaveHover = (starName: string) => () => {
    if (memoizeStars[parseInt(starName)]) {
      return;
    }
    setStars({ ...memoizeStars, [starName]: false });
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e?.preventDefault();
      try {
        let rating: number = null;

        Object.keys(memoizeStars).forEach((el, i) => {
          if (memoizeStars[i]) {
            rating = parseInt(el) + 1;
          }
        });

        if (!rating) {
          throw new Error("Please Rate");
        }

        if (!memoizeReview) {
          throw new Error("Please enter your review");
        }

        if (!user.email) {
          showLogin();
          return;
        }

        await createReview({
          variables: {
            review: memoizeReview,
            rating: rating,
            userId: user?.email,
            productId: productId,
          },
        });

        showModal("Review Submitted", "success");

        setStars({
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
        });
        setReview("");
      } catch (err) {
        showModal(err?.message?.toString(), "error");
        // console.log(err);
      }
    },
    [memoizeStars, memoizeReview, user.email, productId]
  );

  function renderReviews() {
    const array = new Array(10).fill(null);

    if (fetchingReviews) {
      return array.map((_el, i) => (
        <div
          key={i}
          className="w-full flex flex-col rounded-lg bg-gray-300 animate-pulse items-start p-3 gap-4 px-6"
        >
          <div className="flex items-center gap-4 justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-400 animate-pulse items-center justify-center flex" />
              <div className="w-32 h-4 rounded-full bg-gray-400" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-primary text-sx w-20 h-3 rounded-full bg-gray-400" />

              <div className="flex w-12 h-3 rounded-full bg-gray-400"></div>
            </div>
          </div>
					<div className="flex flex-col gap-2 h-40 w-full" >
						<div className="w-full h-40 rounded-md bg-gray-400" />
					</div>
        </div>
      ));
    }

    function renderRating(val: number) {
      const starsArr = new Array(val)?.fill(null);

      return starsArr?.map((_el, i) => (
        <AiFillStar
          key={i}
          size={20}
          className="text-orange-500 cursor-pointer"
        />
      ));
    }

    return memoizeReviews?.map((el, i) => (
      <div
        key={i}
        className="w-full flex flex-col rounded-lg bg-gray-200 items-start p-3 gap-4 px-6"
      >
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-main to-mainSecondary text-white items-center justify-center flex">
              <FaUserAlt />
            </div>
            <h2 className="text-sx font-semibold text-primaryText font-primary">
              {el?.user?.name}
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="font-primary text-sx text-primaryText/60">
              {new Date(parseInt(el?.createdAt)).toDateString()}
            </h2>
            <div className="flex">{renderRating(el?.rating)}</div>
          </div>
        </div>
        <h2 className="text-sx font-primary text-primaryText pl-4">
          {el?.review}
        </h2>
      </div>
    ));
  }

  return (
    <div className="w-full h-[40rem] flex flex-col gap-4 overflow-y-scroll pr-6">
      <h2 className="text-sx font-primary">
        Your email address will not be published. Required fields are marked*
      </h2>
      <div className="flex flex-col gap-2">
        <h2 className="text-sx font-semibold font-primary">Your Rating*</h2>
        <div className="flex">{renderStars()}</div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h2 className="text-sx font-semibold font-primary">Message*</h2>
        <textarea
          onChange={(e) => setReview(e.target.value)}
          value={memoizeReview}
          className="w-full h-20 rounded-md bg-gray-300 outline-none p-4 text-sx font-semibold text-primaryText mb-4"
          placeholder="Write your review"
        />
        <ButtonPrimary
          onClick={handleSubmit}
          type="submit"
          loading={creatingReview}
          title="Submit"
          style={{ color: "#fff" }}
        />
      </form>

      <div className="flex flex-col  border-t border-primaryText/20 gap-10 py-10">
        {renderReviews()}
      </div>
    </div>
  );
}

export default memo(Rating);
