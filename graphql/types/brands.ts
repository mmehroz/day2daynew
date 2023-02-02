//@ts-nocheck
import { objectType, extendType, nonNull, stringArg } from "nexus";

import { Products } from "./products";
import { resolve } from "path";

export const Brands = objectType({
  name: "brands",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("slug");
    t.string("imageURI");
    t.string("category_id");

    t.field("category", {
      type: "categories",
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.categories.findUnique({
          where: {
            id: parent.category_id || "",
          },

          select: {
            slug: true,
          },
        });
      },
    });

    t.list.field("products", {
      type: Products,
      resolve(parent, _args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            brand_id: parent.id,
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

          take: 20,
        });
      },
    });
  },
});

export const brandsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("brands", {
      type: "brands",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.brands.findMany({
          select: {
            slug: true,
            name: true,
            id: true,
          },

          orderBy: {
            name: "asc",
          },
        });
      },
    });

    t.list.field("brandByCat", {
      type: "brands",
      args: {
        slug: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.brands.findMany({
          where: {
            category: {
              slug: args.slug,
            },
          },

          select: {
            slug: true,
            name: true,
          },

          orderBy: {
            name: "asc",
          },
        });
      },
    });
  },
});
