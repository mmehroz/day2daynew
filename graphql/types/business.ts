import { objectType, extendType, enumType, stringArg, nonNull } from "nexus";

export const Business = objectType({
  name: "business",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.string("phone");
    t.string("address");
    t.string("country");
    t.string("city");
    t.string("state");
    t.string("doc");
    t.field("sellerType", {
      type: BusinessSellerType,
    });
    t.field("businessType", {
      type: BusinesType,
    });
  },
});

export const businesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("buisnesses", {
      type: "business",
      resolve: async (_parent, _args, ctx) => {
        return await ctx.prisma.business.findMany();
      },
    });
  },
});

export const businesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createBusinesProfile", {
      type: "business",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phone: nonNull(stringArg()),
        address: nonNull(stringArg()),
        country: nonNull(stringArg()),
        city: nonNull(stringArg()),
        state: nonNull(stringArg()),
        doc: nonNull(stringArg()),
        sellerType: nonNull(BusinessSellerType),
        businesType: nonNull(BusinesType),
      },
      resolve: async (_parent, args, ctx) => {
        // console.log(args);
        return await ctx.prisma.business.create({
          data: {
            name: args.name,
            email: args.email,
            phone: args.phone,
            address: args.address,
            country: args.country,
            city: args.city,
            state: args.state,
            doc: args.doc,
            sellerType: args.sellerType,
            businessType: args.businesType,
          },
        });
      },
    });
  },
});

const BusinessSellerType = enumType({
  name: "BusinessSellerType",
  members: {
    SHOPOWNER: "SHOPOWNER",
    JOBBER: "JOBBER",
    DISTRIBUTER: "DISTRIBUTER",
  },
});

const BusinesType = enumType({
  name: "BusinesType",
  members: {
    VAPESHOP: "VAPESHOP",
    SMOKESHOP: "SMOKESHOP",
    DISPENSARY: "DISPENSARY",
    PACKAGING: "PACKAGING",
  },
});
