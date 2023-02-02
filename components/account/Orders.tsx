import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLazyQuery } from "@apollo/client";
import { queries } from "@queries";

import { UserOrdersProps } from "@types";
import TableRow from "./TableRow";
import Link from "next/link";

function Orders({ email }: { email: string }): JSX.Element {
  //@queries
  const [fetchOrders, { loading: fetchingUserOrders, data: userOrdersDB }] =
    useLazyQuery(queries.userOrders);

  //@states
  const [orders, setOrders] = useState<Array<UserOrdersProps>>([]);

  useEffect(() => {
    if (!userOrdersDB?.userAddress?.orders?.length) return;

    setOrders(userOrdersDB?.userAddress?.orders);
  }, [userOrdersDB]);

  useEffect(() => {
    if (email) {
      fetchOrders({
        variables: {
          email,
        },
      });

      return;
    }
  }, [email]);

  function renderTables() {
    const arr = new Array(10).fill(null);

    if (fetchingUserOrders) {
      return arr?.map((el, i) => (
        <tbody key={i} className="">
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="py-5 px-6 text-sx font-primary font-semibold  rounded-md "
            >
              <div className="w-[90%] h-full bg-gray-300 py-5 px-6 rounded-md animate-pulse " />
            </th>
            <td className="py-5 px-6 text-sx font-primary font-semibold rounded-md">
              <div className="w-[90%] h-full bg-gray-300 py-5 px-6 rounded-md animate-pulse" />
            </td>
            <td className="py-5 px-6 text-sx font-primary font-semibold rounded-md">
              <div className="w-[90%] h-full bg-gray-300 py-5 px-6 rounded-md animate-pulse" />
            </td>
            <td className="py-5 px-6 text-sx font-primary font-semibold rounded-md">
              <div className="w-[90%] h-full bg-gray-300 py-5 px-6 rounded-md  animate-pulse" />
            </td>
            <td className="py-5 px-6 text-sx font-primary font-semibold rounded-md">
              <div className="w-[90%] h-full bg-gray-300 py-5 px-6 rounded-md animate-pulse" />
            </td>
          </tr>
        </tbody>
      ));
    }
    return orders?.map((el, i) => (
      <TableRow key={i} {...el} address={userOrdersDB?.userAddress?.address} />
    ));
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "-10%",
      }}
      animate={{
        opacity: 1,
        y: "0%",
      }}
      exit={{
        opacity: 0,
        y: "-10%",
      }}
      className="text-primaryText"
    >
      <div className="w-full flex h-full flex-col">
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-primaryText/80 font-semibold  font-primary uppercase bg-backgroundColorThird">
              <tr>
                <th scope="col" className="py-5 px-6 ">
                  Order#
                </th>
                <th scope="col" className="py-5 px-6 ">
                  Date
                </th>
                <th scope="col" className="py-5 px-6 ">
                  Status
                </th>
                <th scope="col" className="py-5 px-6 ">
                  Total
                </th>
                <th scope="col" className="py-5 px-6 ">
                  Address
                </th>
              </tr>
            </thead>
            {renderTables()}
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(Orders);
