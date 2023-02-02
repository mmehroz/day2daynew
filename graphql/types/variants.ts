import { objectType, extendType, enumType } from "nexus";

import { Products } from "./products";
import { Variant } from "./variant";

export const Variants = objectType({
  name: "variants",
  definition(t) {
    t.string("id");
    t.string("name");
    t.boolean("required");
    t.string("product_id");
    t.field("type", {
      type: variantsEnumTypes,
    });
    t.field("product", {
      type: Products,
      resolve(parent, _args, ctx) {
        return ctx.prisma.products.findUnique({
          where: {
            id: parent.product_id || "",
          },
        });
      },
    });
    t.list.field("variants", {
      type: Variant,
      resolve(parent, _args, ctx) {
        return ctx.prisma.variant.findMany({
          where: {
            variantTypeId: parent.id,
          },
        });
      },
    });
  },
});

export const variantsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("variants", {
      type: "variants",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.variants.findMany();
      },
    });
  },
});

const variantsEnumTypes = enumType({
  name: "variantsEnum",
  members: {
    COLORS: "COLORS",
    SIZES: "SIZES",
    LIQUIDS: "LIQUIDS",
    BATTERIES: "BATTERIES",
    CHARGERS: "CHARGERS",
    CUSTOMS: "CUSTOMS",
  },
});
