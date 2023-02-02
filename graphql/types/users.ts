import { enumType, extendType, nonNull, objectType, stringArg } from "nexus";
import { Addresses } from "./addresses";

export const Users = objectType({
  name: "users",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.string("number");
    t.string("imageURI");
    t.int("tier");
    t.boolean("verify");
    t.boolean("status");
    t.string("business_id");
    t.field("type", {
      type: AccountTypeEnum,
    });
    t.list.field("addresses", {
      type: "addresses",
      resolve: async (parent, _args, ctx) => {
        return await ctx.prisma.addresses.findMany({
          where: {
            user_id: parent.id,
          },
        });
      },
    });
  },
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: "users",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.users.findMany();
      },
    });
    t.field("isUserExist", {
      type: "users",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.users.findFirst({
          where: {
            email: args.email,
            status: true,
          },

          select: {
            id: true,
          },
        });
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "users",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        business_id: stringArg(),
        number: stringArg(),
        type: AccountTypeEnum,
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.users.create({
          data: {
            ...args,
          },
        });
      },
    });

    t.field("toggleUserVerify", {
      type: "users",
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.users.update({
          where: {
            email: args.email,
          },
          data: {
            verify: true,
          },

          select: {
            email: true,
          },
        });
      },
    });
  },
});

export const AccountTypeEnum = enumType({
  name: "AccountType",
  members: {
    CUSTOMERS: "CUSTOMERS",
    RETAILERS: "RETAILERS",
  },
});
