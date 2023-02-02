import { objectType, extendType, nonNull, stringArg } from "nexus";
import { Filters } from "./filters";
import { Categories } from "./categories";

export const FiltersType = objectType({
  name: "filtersType",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("slug");
    t.string("category_id");

    t.list.field("filters", {
      type: Filters,
      resolve(parent, _args, ctx) {
        return ctx.prisma.filters.findMany({
          where: {
            filterTypeId: parent.id,
          },
        });
      },
    });

    t.field("category", {
      type: Categories,
      resolve(parent, _args, ctx) {
        return ctx.prisma.categories.findUnique({
          where: {
            id: parent.category_id,
          },
        });
      },
    });
  },
});

export const FiltersTypeQuery = extendType({
  type: "Query",

  definition(t) {
    t.list.field("filtersType", {
      type: "filtersType",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.filterType.findMany();
      },
    });

    t.list.field("categoryFiltersType", {
      type: "filtersType",
      args: {
        slug: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.filterType.findMany({
          where: {
            category: {
              slug: args.slug,
            },
          },

          select: {
            name: true,
            id: true,
          },

          orderBy: {
            name: "asc"
          }
        });
      },
    });

    t.field("filtersType", {
      type: "filtersType",
      args: {
        id: nonNull(stringArg()),
      },

      async resolve(_parent, args, ctx) {
        return await ctx.prisma.filterType.findFirst({
          where: {
            id: args.id,
          },

          select: {
            filters: true,
            name: true,
            id: true,
          },
        });
      },
    });
  },
});
