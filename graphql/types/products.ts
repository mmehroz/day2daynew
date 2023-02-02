import { extendType, nonNull, objectType, stringArg } from "nexus";

import { Variants } from "./variants";
import { Categories } from "./categories";

export const Products = objectType({
  name: "products",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("slug");
    t.string("sku");
    t.string("code");
    t.string("imageURI");
    t.int("quantity");

    t.float("purchase_price");
    t.float("selling_price");
    t.float("discount_price");
    t.float("tier1_price");
    t.float("tier2_price");
    t.float("tier3_price");
    t.float("tier4_price");

    t.list.field("tags", {
      type: "String",
    });
    t.list.field("galleryImage", {
      type: "String",
    });

    t.string("short_description");
    t.string("long_description");
    t.string("additional_info");

    t.boolean("hot_deals");
    t.boolean("featured");
    t.boolean("new_arrival");
    t.boolean("special_offer");
    t.boolean("special_deals");
    t.boolean("status");

    t.string("main_category_id");
    t.string("sub_category_id");
    t.string("inner_category_id");
    t.nullable.string("brand_id");
    t.nullable.field("brands", {
      type: "brands",
      resolve: (parent, _args, ctx) => {
        if (!parent?.brand_id) {
          return null;
        }
        return ctx.prisma.brands.findUnique({
          where: {
            id: parent?.brand_id || "",
          },
        });
      },
    });

    t.list.field("variants", {
      type: Variants,
      resolve(parent, _args, ctx) {
        return ctx.prisma.variants.findMany({
          where: {
            product_id: parent.id || "",
          },
        });
      },
    });

    t.field("main_category", {
      type: Categories,
      resolve(parent, _args, ctx) {
        return ctx.prisma.categories.findUnique({
          where: {
            id: parent.main_category_id,
          },
        });
      },
    });

    t.field("sub_category", {
      type: Categories,
      resolve(parent, _args, ctx) {
        return ctx.prisma.categories.findUnique({
          where: {
            id: parent.sub_category_id,
          },
        });
      },
    });

    t.field("inner_category", {
      type: Categories,
      resolve(parent, _args, ctx) {
        return ctx.prisma.categories.findUnique({
          where: {
            id: parent.inner_category_id || "",
          },
        });
      },
    });
  },
});

export const productsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("products", {
      type: "products",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.products.findMany();
      },
    });

    t.list.field("newArrival", {
      type: "products",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.products.findMany({
          orderBy: {
            createdAt: "desc",
          },
          select: {
            slug: true,
            imageURI: true,
            name: true,
            selling_price: true,
            discount_price: true,
            short_description: true,
          },

          take: 20,
        });
      },
    });

    t.field("product", {
      type: "products",
      args: {
        slug: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findUnique({
          where: {
            slug: args.slug,
          },
        });
      },
    });

    t.field("productPopup", {
      type: "products",
      args: {
        slug: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findUnique({
          where: {
            slug: args.slug,
          },
        });
      },
    });

    t.list.field("searchProducts", {
      type: "products",
      args: {
        name: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findMany({
          where: {
            OR: [
              {
                slug: args.name,
              },
              {
                name: {
                  contains: args.name,
                  mode: "insensitive",
                },
              },
              {
                main_category: {
                  name: {
                    contains: args.name,
                    mode: "insensitive",
                  },
                },
              },
              {
                sub_category: {
                  name: {
                    contains: args.name,
                    mode: "insensitive",
                  },
                },
              },
              {
                inner_category: {
                  name: {
                    contains: args.name,
                    mode: "insensitive",
                  },
                },
              },
              {
                tags: {
                  has: args.name,
                },
              },
              {
                brands: {
                  name: {
                    contains: args.name,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },

          orderBy: {
            name: "asc",
          },

          select: {
            slug: true,
            name: true,
            discount_price: true,
            selling_price: true,
            short_description: true,
            imageURI: true,
          },
          take: 50,
        });
      },
    });
    t.list.field("featuredProducts", {
      type: "products",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.products.findMany({
          where: {
            featured: true,
          },

          take: 4,
          orderBy: {
            createdAt: "asc",
          },
          select: {
            name: true,
            slug: true,
            selling_price: true,
            discount_price: true,
            imageURI: true,
            short_description: true,
          },
        });
      },
    });
    t.list.field("brandProduct", {
      type: "products",
      args: {
        slug: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findMany({
          where: {
            brands: {
              slug: args.slug,
            },
          },
          take: 20,
          select: {
            name: true,
            slug: true,
            selling_price: true,
            discount_price: true,
            imageURI: true,
            short_description: true,
          },
        });
      },
    });

    t.list.field("brandProductLoadMore", {
      type: "products",
      args: {
        slug: nonNull(stringArg()),
        id: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findMany({
          where: {
            brands: {
              slug: args.slug,
            },
          },

          select: {
            name: true,
            slug: true,
            selling_price: true,
            discount_price: true,
            imageURI: true,
            short_description: true,
          },

          cursor: {
            slug: args.id,
          },

          take: 20,
          skip: 1,
        });
      },
    });
    t.list.field("flashSale", {
      type: Products,
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findMany({
          where: {
            hot_deals: true,
          },

          select: {
            discount_price: true,
            imageURI: true,
            name: true,
            short_description: true,
            selling_price: true,
            slug: true,
          },
          take: 20,
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });

    t.list.field("saleProducts", {
      type: Products,
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.products.findMany({
          where: {
            OR: [
              {
                hot_deals: true,
              },
              {
                featured: true,
              },
              {
                special_offer: true,
              },
              {
                special_deals: true,
              },
            ],
          },
          select: {
            discount_price: true,
            imageURI: true,
            name: true,
            short_description: true,
            selling_price: true,
            slug: true,
          },
          take: 20,
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });
  },
});
