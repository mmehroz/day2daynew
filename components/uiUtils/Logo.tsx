import Image from "next/image";
import Link from "next/link";

import Logoplaceholder from '../../assets/images/logo-main.svg'

export default function Logo(): JSX.Element {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link passHref href="/">
        <div className="relative sm:h-20 sm:w-40 w-32 h-8 ">
          <Image
            alt="logo-1"
            src={Logoplaceholder}
            fill
            unoptimized
          />
        </div>
      </Link>
    </div>
  );
}
