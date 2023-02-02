import { objectType, extendType, nonNull, stringArg } from "nexus";

export const NewsLetter = objectType({
  name: "NewsLetter",
  definition(t) {
    t.string("id");
    t.string("email");
    t.string("createdAt");
  },
});

export const NewsLetterQuery = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createNewsLetter", {
      type: "NewsLetter",
      args: {
        email: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx) => {
        return await ctx.prisma.newsLetter.create({
          data: {
            email: args.email,
          },
        });
      },
    });
   
  },
});
