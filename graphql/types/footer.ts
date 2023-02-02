
import { objectType, enumType, extendType, nonNull, stringArg } from "nexus";

export const Footer = objectType({
  name: "footer",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("content");
    t.string("imageURI");
    t.string("createdAt");
    t.string("slug");

    t.field("type", { type: FooterType });
  },
});

export const FooterQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("footerData", {
      type: "footer",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.footer.findMany({
          select: {
            type: true,
            slug: true,
            title: true,
          },
        });
      },
    });

    t.list.field("footerContent", {
      type: "footer",
      args: {
        type: nonNull(FooterType),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.footer.findMany({
          where: {
            type: args.type,
          },
          select: {
            slug: true,
            title: true,
          },
        });
      },
    });

    t.field("individualContent", {
      type: "footer",
      args: {
        slug: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.footer.findUnique({
          where: {
            slug: args.slug,
          },
        });
      },
    });
  },
});

const FooterType = enumType({
  name: "FooterType",
  members: {
    ABOUT: "ABOUT",
    CUSTOMERCARE: "CUSTOMERCARE",
    OURINFORMATION: "OURINFORMATION",
  },
});
