import { memo } from "react";
import Link from "next/link";

import { UserOrdersProps } from "@types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

function TableRow({
  id,
  total_price,
  order_id,
  order_status,
  createdAt,
  address,
}: UserOrdersProps): JSX.Element {
  const router = useRouter()

  return (
    <motion.tbody
      initial={{
        opacity: 0,
        x: "-10%",
      }}
      animate={{
        opacity: 1,
        x: "0%",
      }}
      transition={{
        type: "keyframes",
      }}
    >
      <tr onClick={() => router.push(`/order/${id}`)} className="bg-white border-b hover:bg-gray-200 cursor-pointer transition duration-200 ">
        <th
          scope="row"
          className="py-5 px-6 text-sx font-primary font-semibold text-primaryText/80"
        >
          #{order_id}
        </th>
        <td className="py-5 px-6 text-sx font-primary font-semibold text-primaryText/80">
          {new Date(parseInt(createdAt)).toDateString()}
        </td>
        <td className="py-5 px-6 text-sx font-primary font-semibold text-primaryText/80">
          {order_status}
        </td>
        <td className="py-5 px-6 text-sx font-primary font-semibold text-primaryText/80">
          $
          {parseInt(
            total_price
              ?.toString()
              ?.slice(0, total_price?.toString()?.length - 2)
          ).toFixed(2)}
        </td>
        <th
          scope="col"
          className="py-5 px-6 text-sx font-primary font-semibold text-primaryText/80 "
        >
          {address}
        </th>
      </tr>
    </motion.tbody>
  );
}

export default memo(TableRow);
