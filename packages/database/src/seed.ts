import { prisma } from "./client";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  {
    name: "Harbinder Singh",
    phoneNumber: "8219921569",
    otp: 2323,
    isVerified: true,  
  },
] as Array<Partial<User>>;

// (async () => {
//   try {
//     await Promise.all(
//       DEFAULT_USERS.map((user) =>
//         prisma.user.upsert({
//           where: {
//             phoneNumber: user.phoneNumber!, // Changed from id to phoneNumber
//           },
//           update: {
//             ...user,
//           },
//           create: {
//             name: user.name!,
//             phoneNumber: user.phoneNumber!,
//             otp: user.otp!,
//             isVerified: user.isVerified!
//           },
//         })));
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// })();

async function createCart() {
  return await prisma.cart.create({
    data: {
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });
}

// createCart();

const categories = [ {
  name: "Fruits and Vegetables",
  image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png",
} , { name: "Sweet Tooth",
image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png",
}, { name: "Dairy and Bakery",
image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png",
}, { name: "Snacks and Munchies",
   image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png",
}] as Array<{ name: string; image: string }>;

// async function createCategory() {
//   try{
//    const result = await Promise.all(categories.map((category) => {
//       prisma.category.create({
//         data: {
//           name: category.name,
//           image: category.image,
//         }
//       })
//   }
// ));
// console.log(result)
// }catch(e){
//   console.log(e)
// }finally {
//       await prisma.$disconnect();
//     }
// }

async function createCategory(){
  try{
    await prisma.category.deleteMany({});
    await Promise.all(categories.map((categorie)=>{
      return prisma.category.create({
        data: {
          name: categorie.name,
          image: categorie.image
        }
      })
    }))
  }catch(e){
    console.error(e);
  }finally{
    await prisma.$disconnect();
  }
}

// createCategory();

const products = [{
  prodName: "Onion(Payaz)",
  price: 46,
  mrp: 58,
  image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/large_images/jpeg/1bd1341e-8e1e-495d-8faf-906973258762.jpg?ts=1711010248"
  

}];
async function createProduct() {
  
}

createProduct();