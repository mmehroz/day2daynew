import { memo } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";

import { queries } from "@queries";

function FooterContent({
  type,
  title,
}: {
  type: "ABOUT" | "CUSTOMERCARE" | "OURINFORMATION";
  title: string;
}): JSX.Element {
  const { data, loading, error } = useQuery(queries.footerContent, {
    variables: {
      type: type,
    },
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  return (
    <div className="pb-3 md:pb-0 ">
      <h4 className="text-orange-500 text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
        {title}
      </h4>
      <ul>
        {data?.footerContent?.map((el, i) => (
          <li key={i}>
            <Link passHref href={`/footer/${el?.slug}`}>
              <span className="hover:text-main duration-100 transition" >{el?.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(FooterContent);
