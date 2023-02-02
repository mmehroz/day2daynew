import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

// import data from "./data.json";

// interface Products {
//   name: string;
//   slug: string;
//   sku: string;
//   code: string;
//   imageURI: string;
//   quantity: number;
//   purchase_price: number;
//   selling_price: number;
//   discount_price: number;
//   tags: Array<string>;
//   galleryImage: Array<string>;
//   short_description: string;
//   long_description: string;
//   additional_info: string;
//   main_category_id: string;
//   sub_category_id: string;
//   inner_category_id?: string;
//   brand_id: string;
// }

async function main() {
  try {
  

// const res = await prisma.products.
  } catch (err) {
    console.log("error");
    console.log(err);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// // const handleVariants = async (variants) => {
// //   if (!variants?.length) return;
// //   const promises = [];
// //   const variantsPromises = [];

// //   const data = {
// //     variants: [],
// //   };
// //   variants?.forEach((vr, i) => {
// //     const promise = prisma.variants.create({
// //       data: {
// //         id: vr?.id?.toString(),
// //         name: vr.name,
// //         type: vr?.name?.toLowerCase().includes("colors") ? "COLORS" : "CUSTOMS",
// //       },
// //     });

// //     promises.push(promise);
// //     data.variants.push({ id: vr?.id?.toString() });

// //     vr?.attributes?.forEach((el, i) => {
// //       const prom = prisma.variant.create({
// //         data: {
// //           name: el?.size,
// //           quantity: el?.quantity,
// //           variantTypeId: vr?.id?.toString(),
// //           imageURI: `https://portal.day2daywholesale.com/public/assets/img/variantsimages/${el?.variantimage}`,
// //           price: el?.variantprice,
// //           id: el?.id?.toString(),
// //         },
// //       });

// //       variantsPromises?.push(prom);
// //     });
// //   });

// //   return await new Promise((resolve, reject) => {
// //     Promise.all(promises)
// //       .then((res) => {
// //         Promise.all(variantsPromises)
// //           ?.then((ad) => {
// //             resolve(data);
// //           })
// //           .catch((er) => {
// //             reject(er);
// //           });
// //       })
// //       .catch((er) => {
// //         console.log("error at creating variants");
// //         reject(er);
// //       });
// //   });
// // };

// // const res = await prisma.products.create({
// //   data: {
// //     name: "DOVPO X TVC TOPSIDE DUAL 200W SQUONK BOX MOD",
// //     slug: "dovpo-x-tvc-topside-dual-200w-squonk-box-mod",
// //     sku: "dovpo-x-tvc-topside-dual-200w-squonk-box-mod",
// //     code: "12023232126",
// //     imageURI:
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_x_tvc_topside_dual_200w_squonk_box_mod_-_se_group_photo.jpg",
// //     quantity: 10,
// //     purchase_price: 80.0,
// //     selling_price: 99.99,
// //     discount_price: 92.99,
// //     tags: ["devices", "dotmod"],
// //     galleryImage: [
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_x_tvc_topside_dual_200w_squonk_box_mod_-_se_group_photo.jpg",
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_topside_dual_200w_squonk_mod_1.jpg",
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_topside_dual_200w_squonk_mod.jpg",
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_x_tvc_topside_dual_200w_squonk_box_mod_-_black_red.jpg",
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_x_tvc_topside_dual_200w_squonk_box_mod_-_black_blue.jpg",
// //     ],
// //     short_description:
// //       "The DOVPO TOPSIDE DUAL 200W Squonk Box Mod is an updated rendition crafted in collaboration with The Vapor Chronicles, presenting a polished dual 18650 platform while maintaining the innovative top-fill squonk designs and upgraded power chipset!.",
// //     long_description:
// //       "The DOVPO TOPSIDE DUAL 200W Squonk Box Mod is an updated rendition crafted in collaboration with The Vapor Chronicles, presenting a polished dual 18650 platform while maintaining the innovative top-fill squonk designs and upgraded power chipset! Renowned for its high-quality construction with intricate levels of craftsmanship, the DOVPO Vape Topside Dual 200W utilizes a combination of Zinc Alloy and Aluminum Alloy construction to create an ergonomic form factor that fits dual 18650 batteries (sold separately) and the signature 10mL squonk bottles. The new intelligent chipset has a new maximum output of 200W and 12 Volts, featuring a minimum atomizer resistance of 0.08ohm to power a full range of squonk RDAs in the market. Within the unit, the squonk bottle can be filled from the top, after unscrewing a knurled and threaded top cap. The squonking action on the Topside Dual Box Mod is found opposite of the firing button and display face allowing for a high-level vape experience. The leak-resistant 510 base is useful that it will not allow juice within the internals. Furthermore, the 510 base is gold-plated and spring-loaded for the best possible conductivity.",
// //     variants: {
// //       connect: [
// //         {
// //           id: "6e8ea1b2-07f4-48e8-a5ec-13dd4dd200fb",
// //         },
// //         {
// //           id: "ae90a3ce-a45f-4b5e-898d-86e37c001fbc",
// //         },
// //         {
// //           id: "43a2548b-410e-45b2-9b91-ea9fe9e11169",
// //         },
// //         {
// //           id: "aff33b44-0793-47df-9220-3ac874dc95b5",
// //         },
// //       ],
// //     },
// //     main_category_id: "b28fbef5-2adf-4121-aafd-e982b7a86e64",
// //     sub_category_id: "44eb6839-5f63-43e2-bec0-f094cd2381e6",
// //     brand_id: "d811c20f-48ac-4dfc-a2bb-21cc9bbf6865",
// //     filters: {
// //       connect: [
// //         {
// //           id: "5caf3931-ece3-40cb-be17-95d6ee574d64",
// //         },
// //         {
// //           id: "12794d19-3654-4ab1-9594-7f9513f71149",
// //         },
// //         {
// //           id: "210e1c65-ec0a-45b0-8b62-fee47620379d",
// //         },
// //         {
// //           id: "381dcca0-2560-4f1a-af60-e2f769dfb74d",
// //         },
// //         {
// //           id: "1db1830f-0bac-4283-a856-66d92b847c7e",
// //         },
// //       ],
// //     },
// //   },
// // });

// // const createdFilters = await prisma.filters.createMany({
// //   data: [
// //     {
// //       name: "Silver / SS",
// //       filterTypeId: "1afca6bb-858a-445b-99ee-c3d28259e31a",
// //       slug: "#C0C0C0",
// //     },
// //     {
// //       name: "Gunmental",
// //       filterTypeId: "1afca6bb-858a-445b-99ee-c3d28259e31a",
// //       slug: "#062726",
// //     },
// //     {
// //       name: "Green",
// //       filterTypeId: "1afca6bb-858a-445b-99ee-c3d28259e31a",
// //       slug: "#9cf945",
// //     },
// //   ],
// // });

// // const update = await prisma.products.update({
// //   where: {
// //     id: "342aadda-815a-4cbd-8f04-1b3be6c80b8c",
// //   },

// //   data: {
// //     variants: {
// //       connect: [
// //         {
// //           id: "6e8ea1b2-07f4-48e8-a5ec-13dd4dd200fb",
// //         },
// //         {
// //           id: "ae90a3ce-a45f-4b5e-898d-86e37c001fbc",
// //         },
// //         {
// //           id: "43a2548b-410e-45b2-9b91-ea9fe9e11169",
// //         },
// //         {
// //           id: "aff33b44-0793-47df-9220-3ac874dc95b5",
// //         },
// //         {
// //           id: "626ce9fe-49a4-440f-aaa9-aaf007616145",
// //         },
// //       ],
// //     },
// //   },
// // });

// // console.log(update);

// // const variants = prisma.variants.create({
// //   data: {
// //     name: "Batteries",
// //   },
// // });

// // const res = await prisma.products.create({
// //   data: {
// //     name: "DOVPO X ACROSS PUMP SQUONKER BOX MOD",
// //     slug: "dovpo-x-across-pump-squonker-box-mod",
// //     sku: "dovpo-x-across-pump-squonker-box-mod",
// //     code: "12150215051",
// //     imageURI:
// //       "https://www.elementvape.com/media/catalog/product/cache/177ff88e405dbdaf9e02a16630acb6f3/d/o/dovpo_-_pump_squonker_-_mods_-_all_colors_1.png",
// //     quantity: 100,
// //     purchase_price: 50.0,
// //     selling_price: 64.99,
// //     discount_price: 60.0,
// //     tags: ["device", "dotmod"],

// //     galleryImage: [
// //       "https://www.elementvape.com/media/catalog/product/cache/3a75523582ef979e8ab213035d9985c4/d/o/dovpo_-_pump_squonker_-_mods_-_all_colors_1.png",
// //       "https://www.elementvape.com/media/catalog/product/cache/3a75523582ef979e8ab213035d9985c4/1/4/1435272668-7ba2dc50ee7c21b41073a4aee2d5386aab679e2f5bec41a8847b629c5295071f-d_295x166",
// //       "https://www.elementvape.com/media/catalog/product/cache/3a75523582ef979e8ab213035d9985c4/d/o/dovpo_-_pump_squonker_-_mods_stainless_steel.png",
// //       "https://www.elementvape.com/media/catalog/product/cache/3a75523582ef979e8ab213035d9985c4/d/o/dovpo_-_pump_squonker_-_mods_-_black_1.png",
// //     ],
// //     short_description:
// //       "Discover the Dovpo x Across Pump Squonker Box Mod, featuring an electronic squonk pump, voltage based output, and is powered by a single battery cell (Sold Separately",
// //     long_description:
// //       "Discover the Dovpo x Across Pump Squonker Box Mod, featuring an electronic squonk pump, voltage based output, and is powered by a single battery cell. Constructed from durable stainless steel and aluminum, the Pump Squonker Mod is a decently sized box mod. Pairing perfectly with 24mm atomizers, the Pump Squonker Box Mod shines particularly bright when paired with bottom fed squonk capable RDAs. In addition, the Pump Squonker operates off battery based voltage output, eliminating the need for adjustment buttons and a screen..",
// //     main_category_id: "b28fbef5-2adf-4121-aafd-e982b7a86e64",
// //     sub_category_id: "44eb6839-5f63-43e2-bec0-f094cd2381e6",
// //     brand_id: "d811c20f-48ac-4dfc-a2bb-21cc9bbf6865",
// //     variants: {
// //       connect: [
// //         {
// //           id: "aff33b44-0793-47df-9220-3ac874dc95b5",
// //         },
// //         {
// //           id: "43a2548b-410e-45b2-9b91-ea9fe9e11169",
// //         },
// //         {
// //           id: "ae90a3ce-a45f-4b5e-898d-86e37c001fbc",
// //         },
// //         {
// //           id: "6e8ea1b2-07f4-48e8-a5ec-13dd4dd200fb",
// //         },
// //         {
// //           id: "626ce9fe-49a4-440f-aaa9-aaf007616145",
// //         },
// //       ],
// //     },

// //     filters: {
// //       connect: [
// //         {
// //           id: "5caf3931-ece3-40cb-be17-95d6ee574d64",
// //         },
// //         {
// //           id: "210e1c65-ec0a-45b0-8b62-fee47620379d",
// //         },
// //         {
// //           id: "381dcca0-2560-4f1a-af60-e2f769dfb74d",
// //         },
// //         {
// //           id: "1db1830f-0bac-4283-a856-66d92b847c7e",
// //         },
// //         {
// //           id: "4a0d0883-e9c2-4eb7-9a64-4cef22bed9fb",
// //         },
// //       ],
// //     },
// //   },
// // });
