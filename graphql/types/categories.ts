import {
  objectType,
  extendType,
  enumType,
  stringArg,
  nonNull,
  nullable,
  intArg,
  booleanArg,
} from "nexus";

import { Products } from "./products";
import { Brands } from "./brands";

export const Categories = objectType({
  name: "categories",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("slug");
    t.string("imageURI");

    t.boolean("active");
    t.field("type", {
      type: categoriesTypes,
    });

    t.string("parentId");

    t.list.field("child", {
      type: "categories",
      args: {
        active: booleanArg(),
      },
      async resolve(parent, args, ctx) {
        const res = await ctx.prisma.categories.findMany({
          where: {
            parent: {
              id: parent.id,
            },
            active: args.active,
          },
          orderBy: {
            name: "asc",
          },
        });
        console.log(res);
        return res;
      },
    });

    t.field("parent", {
      type: "categories",
      resolve(parent, _args, ctx) {
        return ctx.prisma.categories.findUnique({
          where: {
            id: parent?.parentId || "",
          },
        });
      },
    });

    t.list.field("MainProducts", {
      type: Products,
      args: {
        take: nullable(intArg()),
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            main_category_id: parent.id,
          },
          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
          },
          take: args?.take ? args?.take : 20,
        });
      },
    });

    t.list.field("LoadMoreMainProducts", {
      type: Products,
      args: {
        take: nullable(intArg()),
        lastPSlug: nonNull(stringArg()),
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            main_category_id: parent.id,
          },
          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
          },
          take: args?.take ? args?.take : 20,
          skip: 1,
          cursor: {
            slug: args.lastPSlug,
          },
        });
      },
    });

    t.list.field("LoadMoreSubProducts", {
      type: Products,
      args: {
        take: nullable(intArg()),
        lastPSlug: nonNull(stringArg()),
      },

      resolve(parent, args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            sub_category_id: parent.id,
          },

          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
          },

          take: args?.take ? args?.take : 20,
          skip: 1,
          cursor: {
            slug: args.lastPSlug,
          },
        });
      },
    });

    t.list.field("SubProducts", {
      type: Products,
      args: {
        take: nullable(intArg()),
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            sub_category_id: parent.id,
          },

          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
          },
          take: args?.take ? args?.take : 20,
        });
      },
    });

    t.list.field("LoadMoreInnerProducts", {
      type: Products,
      args: {
        take: nullable(intArg()),
        lastPSlug: nonNull(stringArg()),
      },

      resolve(parent, args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            inner_category_id: parent.id,
          },

          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
          },

          take: args.take ? args.take : 20,
          skip: 1,
          cursor: {
            slug: args.lastPSlug,
          },
        });
      },
    });

    t.list.field("InnerProducts", {
      type: Products,
      args: {
        take: nullable(intArg()),
      },
      resolve(parent, args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            inner_category_id: parent.id,
          },
          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
            id: true,
          },
          take: args?.take ? args?.take : 20,
        });
      },
    });

    t.list.field("brands", {
      type: Brands,
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.brands.findMany({
          where: {
            category_id: parent.id,
            NOT: [
              {
                slug: "geek-vape",
              },
              {
                slug: "smoktech",
              },
              {
                slug: "suorin",
              },
              {
                slug: "uwell",
              },
              {
                slug: "vaporesso",
              },
              {
                slug: "yocan",
              },
              {
                slug: "voopoo",
              },
            ],
          },
        });
      },
    });
  },
});

export const categoriesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("categories", {
      type: "categories",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.categories.findMany();
      },
    });
    t.list.field("categoriesHeader", {
      type: "categories",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.categories.findMany({
          where: {
            type: "MAIN",
            active: true,
          },
        });
      },
    });

    t.field("categoryProducts", {
      type: "categories",
      args: {
        slug: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.categories.findUnique({
          where: {
            slug: args.slug,
          },
        });
      },
    });

    t.field("category", {
      type: "categories",
      args: {
        slug: nonNull(stringArg()),
      },

      async resolve(_parent, args, ctx) {
        return await ctx.prisma.categories.findUnique({
          where: {
            slug: args.slug,
          },
        });
      },
    });
  },
});

const categoriesTypes = enumType({
  name: "categoriesTypes",
  members: {
    MAIN: "MAIN",
    SUB: "SUB",
    INNER: "INNER",
  },
});
