import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  floatArg,
  list,
  enumType,
} from "nexus";
import { ProductOrder } from "./productOrder";

export const Order = objectType({
  name: "orders",
  definition(t) {
    t.string("id");
    t.string("traction_id");
    t.float("total_price");
    t.float("subtotal");
    t.string("address_id");
    t.int("order_id");
    t.field("order_status", {
      type: OrderStatusEnum,
    });
    t.field("Address", {
      type: "addresses",
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.addresses.findUnique({
          where: {
            id: parent.address_id,
          },
        });
      },
    });
    t.list.field("orderProducts", {
      type: ProductOrder,
      resolve(parent, _args, ctx) {
        return ctx.prisma.productOrders.findMany({
          where: {
            order_id: parent.id,
          },
        });
      },
    });

    t.string("createdAt");
  },
});

export const OrderQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("orders", {
      type: "orders",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.orders.findMany();
      },
    });

    t.field("singleOrder", {
      type: "orders",
      args: {
        id: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        const dataById = await ctx.prisma.orders.findUnique({
          where: {
            id: args.id,
          },
        });

        if (dataById?.id) {
          return dataById;
        }

        return await ctx.prisma.orders.findUnique({
          where: {
            order_id: parseInt(args.id),
          },
        });
      },
    });
  },
});

export const OrderMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createOrder", {
      type: "orders",
      args: {
        traction_id: nonNull(stringArg()),
        total_price: nonNull(floatArg()),
        subtotal: nonNull(floatArg()),
        address_id: nonNull(stringArg()),
      },

      async resolve(_parent, args, ctx) {
        return await ctx.prisma.orders.create({
          data: {
            traction_id: args.traction_id,
            total_price: args.total_price,
            subtotal: args.subtotal,
            address_id: args.address_id,
          },
        });
      },
    });
  },
});

const OrderStatusEnum = enumType({
  name: "OrderStatusEnum",
  members: {
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
  },
});
