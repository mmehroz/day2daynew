import { objectType, extendType, enumType, nonNull, stringArg } from "nexus";

export const Auth = objectType({
  name: "Auth",
  definition(t) {
    t.string("id");
    t.string("oobCode");
    t.boolean("applied");
    t.field("mode", { type: AuthType });
    t.string("email");
  },
});

export const AuthQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("validCredentials", {
      type: "String",
      args: {
        oobCode: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
        // console.log("valid cred");
        // console.log(args);
        const res = await ctx.prisma.auth.findUnique({
          where: {
            oobCode: args.oobCode,
          },

          select: {
            email: true,
            createdAt: true,
            applied: true,
          },
        });

        // console.log(res)

        if (res?.applied) return "";

        if (res?.email) {
          const createdDate = new Date(res?.createdAt);
          const currentDate = new Date(Date.now());

          let diff = (createdDate.getTime() - currentDate.getTime()) / 1000;
          diff /= 60;
          if (Math.abs(Math.round(diff)) < 10) {
            const data = await ctx.prisma.auth.update({
              where: {
                oobCode: args.oobCode,
              },
              data: {
                applied: true,
              },

              select: {
                email: true,
              },
            });
            return data.email;
          }
        }
        return "";
      },
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createAuth", {
      type: "Auth",
      args: {
        email: nonNull(stringArg()),
        oobCode: nonNull(stringArg()),
        mode: nonNull(AuthType),
      },
      resolve: (_parent, args, ctx) => {
        // console.log(args);
        // console.log("create auth");
        return ctx.prisma.auth.create({
          data: {
            email: args.email,
            oobCode: args.oobCode,
            mode: args.mode,
          },
        });
      },
    });
  },
});

const AuthType = enumType({
  name: "AuthType",
  members: {
    verifyEmail: "verifyEmail",
    passwordReset: "passwordReset",
  },
});
