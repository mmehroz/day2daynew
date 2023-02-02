//@ts-nocheck
import { objectType, extendType, stringArg, nonNull, intArg } from 'nexus';

export const Reviews = objectType({
	name: 'Review',
	definition(t) {
		t.string('id');
		t.string('user_id');
		t.string('review');
		t.int('rating');
		t.string('product_id');

		t.string('createdAt');
		t.string('updatedAt');

		t.field('user', {
			type: 'users',
			resolve: (parent, _args, ctx) => {
				return ctx.prisma.users.findUnique({
					where: {
						id: parent.user_id,
					},
					select: {
						name: true,
						email: true,
					},
				});
			},
		});
	},
});

export const reviewQuery = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('reviews', {
			type: 'Review',
			resolve: async (_parent, _args, ctx) => {
				return await ctx.prisma.reviews.findMany();
			},
		});

		t.list.field('productreviews', {
			type: 'Review',
			args: {
				productId: nonNull(stringArg()),
			},
			resolve: async (_parent, args, ctx) => {
				return await ctx.prisma.reviews.findMany({
					where: {
						product_id: args.productId,
					},
				});
			},
		});
	},
});

export const reviewMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('createReview', {
			type: 'Review',
			args: {
				review: nonNull(stringArg()),
				rating: nonNull(intArg()),
				user_id: nonNull(stringArg()),
				product_id: nonNull(stringArg()),
			},
			resolve: async (_parent, args, ctx) => {
				const user = await ctx.prisma.users.findUnique({
					where: {
						email: args.user_id,
					},

					select: {
						id: true,
					},
				});

				if (!user?.id) {
					throw new Error('No user exists');
				}

				const beforeReviewed = await ctx.prisma.reviews.findFirst({
					where: {
						user_id: user?.id,
						product_id: args.product_id,
					},
				});

				if (beforeReviewed) {
					throw new Error('You already reviewed this product');
				}

				try {
					return await ctx.prisma.reviews.create({
						data: {
							review: args.review,
							user_id: user.id,
							product_id: args.product_id,
							rating: args.rating,
						},
					});
				} catch (err) {
					// console.log(err);
				}
			},
		});
	},
});
