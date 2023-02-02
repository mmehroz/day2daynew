import React, { useState } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { useLazyQuery } from "@apollo/client";
import { queries } from "@queries";
import FooterContent from "./FooterContent";

import LogoSecond from "../../assets/images/logo-second.svg";
import MasterCard from "../../assets/images/mastercard.svg";
import Visa from "../../assets/images/visa.svg";
import Paypal from "../../assets/images/paypal.svg";
import Amx from '../../assets/images/amx-2.png'
import Discover from '../../assets/images/discover.png'

function Footer(): JSX.Element {
  return (
    <div>
      <div className="footer grid sm:px-12 pl-4  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 md:gap-9 xl:gap-14 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1 pt-10  bg-white items-top">
        <Link passHref href="/">
          <div>
            <Image
              width={170}
              height={50}
              src={LogoSecond}
              alt="Logo-secondary"
              unoptimized
            />
          </div>
        </Link>
        <div className="pb-3 md:pb-0 ">
          <h4 className="text-orange-500 text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
            Social
          </h4>
          <ul>
            <li>
              <a>
                <FaFacebook color="orange" size={18} className="mr-2" />
                Facebook
              </a>
            </li>
            <li>
              <a>
                <FaInstagram color="orange" size={18} className="mr-2" />
                Instagram
              </a>
            </li>
            <li>
              <a>
                <FaTiktok color="orange" size={18} className="mr-2" />
                Tiktok
              </a>
            </li>
            <li>
              <a>
                <FaYoutube color="orange" size={18} className="mr-2" /> youtube
              </a>
            </li>
          </ul>
        </div>

        <div className="pb-3 md:pb-0 ">
          <h4 className="text-orange-500 text-sm md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
            Contact
          </h4>
          <ul>
            <li>
              <a>Contact Us</a>
            </li>
            <li>
              <a>support@day2daywholesale.com</a>
            </li>
            <li>
              <a>Call us: {"(800) 123 6549"}</a>
            </li>
          </ul>
        </div>

        <FooterContent title="About Us" type="ABOUT" />
        <FooterContent title="Customer Care" type="CUSTOMERCARE" />
        <FooterContent title="Our Information " type="OURINFORMATION" />
      </div>

      <div className="f-copyright border-t border-gray-300 pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
        <div className="flex flex-col-reverse md:flex-row text-center md:justify-between mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
          <p>
            Copyright © 2022&nbsp;
            <Link
              className="font-semibold text-orange-500 transition-colors duration-200 ease-in-out hover:text-body"
              href="https://day2daywholesale.com/"
            >
              DAY2DAY WHOLESALE
            </Link>
            &nbsp; All rights reserved
          </p>

          <ul className="hidden md:flex flex-wrap justify-center items-center space-s-4 xs:space-s-5 lg:space-s-7 mb-1 md:mb-0 mx-auto md:mx-0">
            <li className="mb-2 md:mb-0 transition hover:opacity-80">
              <a href="#">
                <Image
                  className="h-[28px]"
                  src={MasterCard}
                  alt="Master Card"
                  unoptimized

                />
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80">
              <a href="#">
                <Image
                  className="h-[22px]"
                  src={Visa}
                  alt="Visa"
                  unoptimized
                />
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80">
              <a href="#">
                <Image
                  className="h-[19px]"
                  src={Paypal}
                  alt="Paypal"
                  unoptimized
                />
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80">
              <a href="#">
                <Image
                  className="h-[25px] w-[60px]"
                  height={25}
                  width={50}
                  src={Amx}
                  alt="American Express"
                  unoptimized
                />
              </a>
            </li>
            <li className="mb-2 md:mb-0 transition hover:opacity-80">
              <a href="#">
                <Image
                  className="h-[14px] w-[60px]"
                  src={Discover}
                  alt="Discover"
                  unoptimized
                  

                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
