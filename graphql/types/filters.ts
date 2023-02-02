import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  list,
  nullable,
} from "nexus";

import { FiltersType } from "./filtersTypes";
import { Products } from "./products";

export const Filters = objectType({
  name: "filters",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("slug");
    t.string("filterTypeId");

    t.field("filtersTypes", {
      type: FiltersType,

      resolve(parent, _args, ctx) {
        return ctx.prisma.filterType.findUnique({
          where: {
            id: parent.filterTypeId,
          },
        });
      },
    });

    t.list.field("products", {
      type: Products,
      resolve(parent, _args, ctx) {
        return ctx.prisma.products.findMany({
          where: {
            filters: {
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

export const filtersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("fitlers", {
      type: "filters",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.filters.findMany();
      },
    });

    t.list.field("filterById", {
      type: "filters",
      args: {
        id: nonNull(list(nonNull("String"))),
        category_slug: nullable(stringArg()),
        sub_category_slug: nullable(stringArg()),
        inner_category_slug: nullable(stringArg()),
      },

      async resolve(_parent, args, ctx) {
        if (args.inner_category_slug?.length) {
          return await ctx.prisma.filters.findMany({
            where: {
              id: {
                in: args.id.map((el) => el),
              },
              products: {
                some: {
                  inner_category: {
                    slug: args.inner_category_slug,
                  },
                },
              },
            },
            select: {
              id: true,
              name: true,
              products: true,
            },
          });
        }

        if (args.sub_category_slug?.length) {
          return await ctx.prisma.filters.findMany({
            where: {
              id: {
                in: args.id.map((el) => el),
              },
              products: {
                some: {
                  sub_category: {
                    slug: args.sub_category_slug,
                  },
                },
              },
            },
            select: {
              id: true,
              name: true,
              products: true,
            },
          });
        }

        if (args.category_slug?.length) {
          return await ctx.prisma.filters.findMany({
            where: {
              id: {
                in: args.id.map((el) => el),
              },
              products: {
                some: {
                  main_category: {
                    slug: args.category_slug,
                  },
                },
              },
            },

            select: {
              id: true,
              name: true,
              products: true,
            },
          });
        }
      },
    });
  },
});
