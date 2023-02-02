import { objectType, extendType, enumType } from "nexus";

import { Variants } from "./variants";

export const Variant = objectType({
  name: "variant",
  definition(t) {
    t.string("id");
    t.string("name");
    t.float("price");
    t.string("imageURI");
    t.int("quantity");
    t.string("variantTypeId");
    t.string("sku")

    t.field("variantType", {
      type: Variants,
      resolve(parent, _args, ctx) {
        return ctx.prisma.variants.findUnique({
          where: {
            id: parent.variantTypeId || "",
          },
        });
      },
    });
  },
});

export const vaiantQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("singleVariant", {
      type: "variant",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.variant.findMany();
      },
    });
  },
});
