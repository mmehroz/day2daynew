import { memo, useState, useEffect, ChangeEvent, useContext } from "react";
import Image from "next/image";
import ButtonPrimary from "./ButtonPrimary";

import Placeholder from "../../assets/images/vector-1.svg";
import { useMutation } from "@apollo/client";
import { queries } from "@queries";
import { UiConext } from "@context";
import axios from "axios";

function Newsbar(): JSX.Element {
  const { showModal } = useContext(UiConext);
  const [createNewsLetter] = useMutation(queries.createNewsLetter);

  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      if (!value?.length) {
        showModal("Please provide your email", "error");
        return;
      }

      setLoading(true);

      await createNewsLetter({
        variables: {
          email: value,
        },
      });

      await axios("/api/user/newsLetter", {
        data: {
          email: value,
        },
        method: "POST",
      });

      setLoading(false);

      showModal("Thanks For Subscribtion", "success");
      setValue("");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter mt-40 sm:mt-60 rounded-md w-full justify-between flex flex-col md:flex-row p-6  md:p-12 md:items-center h-[auto] md:h-[200px] relative">
      <div className="flex items-center gap-10 w-full">
        <div className="w-60 h-[200px] hidden sm:flex relative ">
          <div className="w-96 h-96   absolute -bottom-[62px] -left-32">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/day2day-25451.appspot.com/o/svgs%2FVector_01.svg?alt=media&token=a99ce1ca-80e4-42fb-9407-10d670cea8e6"
              alt="logo"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className=" flex-col flex">
          <h1 className="text-white text- font-bold font-primary text-md">
            Get Expert Tips In Your Inbox
          </h1>
          <p className="text-white font-primary text-base">
            Subscribe to our newsletter and stay updated.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-[25px] md:flex-row  justify-end md:items-center gap-2 sm:pr-10"
      >
        <input
          className="bg-white w-full  md:w-[370px] px-8 py-4 rounded-[8px] outline-none"
          type="text"
          placeholder="Write your email here"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div className="w-full sm:w-[40%]">
          <ButtonPrimary
            onClick={handleSubmit}
            varaint="white"
            style={{ height: "3.5rem", width: "100%" }}
            title="Subscribe"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default memo(Newsbar);
