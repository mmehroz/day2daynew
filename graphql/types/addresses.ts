//@ts-nocheck
import { extendType, nonNull, objectType, stringArg } from "nexus";

import { Order } from "./orders";

export const Addresses = objectType({
  name: "addresses",
  definition(t) {
    t.string("id");
    t.string("address");
    t.string("city");
    t.string("postcode");
    t.string("label");
    t.string("user_id");
    t.string("firstName");
    t.string("lastName");
    t.string("number");

    t.list.field("orders", {
      type: Order,
      resolve(parent, _args, ctx) {
        return ctx.prisma.orders.findMany({
          where: {
            address_id: parent.id,
          },
          orderBy: {
            order_id: "desc",
          },
        });
      },
    });
  },
});

export const AddressesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("addresses", {
      type: "addresses",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.addresses.findMany({});
      },
    });

    t.field("userAddress", {
      type: "addresses",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.addresses.findFirst({
          where: {
            user: {
              email: args.email,
            },
          },
        });
      },
    });
  },
});

export const AddressMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createdAddress", {
      type: "addresses",
      args: {
        address: nonNull(stringArg()),
        city: stringArg(),
        postcode: stringArg(),
        label: nonNull(stringArg()),
        user_id: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        number: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        let user_id: string = "";
        if (args?.user_id) {
          user_id = (
            await ctx.prisma.users.findUnique({
              where: {
                email: args.user_id,
              },
              select: {
                id: true,
              },
            })
          ).id;
        }
        return await ctx.prisma.addresses.create({
          data: {
            ...args,
            user_id: user_id,
          },
        });
      },
    });

    t.field("updateAddress", {
      type: "addresses",
      args: {
        address: stringArg(),
        city: stringArg(),
        postcode: stringArg(),
        label: stringArg(),
        user_id: stringArg(),
        firstName: stringArg(),
        lastName: stringArg(),
        addressId: nonNull(stringArg()),
        number: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        // console.log(args);
        const res = await ctx.prisma.users.findUnique({
          where: {
            email: args.user_id,
          },

          select: {
            id: true,
          },
        });

        return await ctx.prisma.addresses.update({
          where: {
            id: args.addressId,
          },
          data: {
            address: args.address,
            city: args.city,
            postcode: args.postcode,
            label: args.label,
            firstName: args.firstName,
            lastName: args.lastName,
            user_id: res.id,
            number: args.number,
          },
        });
      },
    });
  },
});
