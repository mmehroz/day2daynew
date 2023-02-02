import {
  objectType,
  extendType,
  enumType,
  list,
  nonNull,
  stringArg,
} from "nexus";

export const SliderImages = objectType({
  name: "SliderImages",
  definition(t) {
    t.string("id");
    t.list.string("images");
    t.field("type", {
      type: ImagesType,
    });
  },
});

export const sliderImagesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("images", {
      type: "SliderImages",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.sliderImages.findMany();
      },
    });
    t.field("sliderImages", {
      type: "SliderImages",
      args: {
        type: nonNull(ImagesType),
      },
      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.sliderImages.findUnique({
          where: {
            type: args.type,
          },
          select: {
            images: true,
          },
        });
      },
    });
  },
});

export const ImagesType = enumType({
  name: "ImageType",
  members: {
    MAIN: "MAIN",
    SECONDARY: "SECONDARY",
    THIRD: "THIRD",
    FOURTH: "FOURTH",
    FIFTH: "FIFTH",
  },
});
