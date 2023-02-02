//@ts-nocheck
import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  floatArg,
  nullable,
  list,
} from "nexus";

import { Variant } from "./variant";

export const ProductOrder = objectType({
  name: "productOrder",
  definition(t) {
    t.string("id");
    t.string("productId");
    t.int("quantity");
    t.float("purchasedPrice");
    t.string("order_id");

    t.field("product", {
      type: "products",
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.products.findUnique({
          where: {
            id: parent.productId,
          },
        });
      },
    });

    t.list.field("variants", {
      type: Variant,
      resolve(parent, _args, ctx) {
        return ctx.prisma.variant.findMany({
          where: {
            productOrder: {
              some: {
                id: parent.id,
              },
            },
          },
        });
      },
    });
  },
});

export const ProductOrderQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("productOrders", {
      type: "productOrder",

      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.productOrders.findMany();
      },
    });
  },
});

export const ProductOrderMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProductOrder", {
      type: "productOrder",
      args: {
        productId: nonNull(stringArg()),
        quantity: intArg(),
        purchasedPrice: nonNull(floatArg()),
        order_id: nonNull(stringArg()),
        variant_id: list(stringArg()),
      },

      async resolve(_parent, args, ctx) {
        // console.log("product orders run");
        await ctx.prisma.products.update({
          where: {
            id: args.productId,
          },

          data: {
            quantity: {
              decrement: args.quantity,
            },
          },
        });

        if (args?.variant_id?.length) {
          // console.log("variants exists");

          const promises = [];
          const promisesVariants = [];
          const orders = await ctx.prisma.productOrders.create({
            data: {
              productId: args.productId,
              quantity: args.quantity,
              purchasedPrice: args.purchasedPrice,
              order_id: args.order_id,
            },

            select: {
              id: true,
            },
          });

          // console.log("product created");

          args.variant_id.forEach((el, i) => {
            const promise = ctx.prisma.productOrders.update({
              where: {
                id: orders.id,
              },

              data: {
                variant: {
                  connect: {
                    id: el,
                  },
                },
              },
            });

            promises.push(promise);
          });

          await Promise.all(promises);
          // console.log("variant attach to order");

          args.variant_id.forEach((el, i) => {
            const promise = ctx.prisma.variant.update({
              where: {
                id: el,
              },

              data: {
                quantity: {
                  decrement: 1 * args.quantity,
                },
              },
            });

            promisesVariants.push(promise);
          });

          await Promise.all(promisesVariants);

          return [{ id: "successfull" }];
        }

        await ctx.prisma.productOrders.create({
          data: {
            productId: args.productId,
            quantity: args.quantity,
            purchasedPrice: args.purchasedPrice,
            order_id: args.order_id,
          },

          select: {
            id: true,
          },
        });

        return [{ id: "successfull" }];
      },
    });
  },
});
