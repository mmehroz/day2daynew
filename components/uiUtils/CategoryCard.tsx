import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

function CategoryCard({
  name,
  imageURI,
  slug,
}: {
  name: string;
  imageURI: string;
  slug: string;
}): JSX.Element {
  return (
    <Link passHref href={`/category/${slug}`}>
      <div className="category-card transition duration-200 gap-6 text-primaryText hover:text-white catCardPrent">
        <div className="w-[80%] h-[40%] relative">
          <Image
            src={imageURI}
            alt={name}
            fill
            className="svg-white transition duration-200"
            unoptimized
          />
        </div>
        <h2 className="text-sm font-primary ">{name}</h2>
      </div>
    </Link>
  );
}

export default memo(CategoryCard);
