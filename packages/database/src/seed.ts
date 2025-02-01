import { prisma } from "./client";

import type { User, Category } from "@prisma/client";

const DEFAULT_USERS = [
  {
    name: "Harbinder Singh",
    phoneNumber: "8219921569",
    otp: 2323,
    isVerified: true,
  },
] as Array<Partial<User>>;

async function seedUsers() {
  try {
    await prisma.user.deleteMany({});
    await Promise.all(
      DEFAULT_USERS.map(async (user) =>{
        const currentUser = await prisma.user.upsert({
          where: {
            phoneNumber: user.phoneNumber!, // Changed from id to phoneNumber
          },
          update: {
            ...user,
          },
          create: {
            name: user.name!,
            phoneNumber: user.phoneNumber!,
            otp: user.otp!,
            isVerified: user.isVerified!
          },
        })
        console.log("User created");
        console.log("Starting cart creation...");
        //create cart for user 
        await prisma.cart.create({
          data: {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });
  }));
      
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}



const categories = [{
  name: "Fruits and Vegetables",
  image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png",
}, {
  name: "Sweet Tooth",
  image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png",
}, {
  name: "Dairy and Bakery",
  image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png",
}, {
  name: "Snacks and Munchies",
  image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png",
}] as Array<Partial<Category>>;


async function createCategory() {
  try {
    await prisma.category.deleteMany({});
    await Promise.all(categories.map((categorie) => {
      return prisma.category.create({
        data: {
          name: categorie.name!,
          image: categorie.image
        }
      })
    }))
  } catch (e) {
    console.error(e);
  }
}


const products = [{
  prodName: "Nestle Munch Nuts",
  prodDescription: "Try the Munch Max Coated Wafer With Xtra Crunchy & Xtra Chocotaste. With This Value Pack, Get 3 Chocolate Coated Wafer Bars and Discover an Indulgent Choco Taste on Your Favourite Munch Bar! Relish the Crunchilicious Wafer With a Yummy Taste Munch Max Bar Is a Light Treat, Offering an Unforgettable Experience",
  price: 46,
  mrp: 58,
  images: ["https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/large_images/jpeg/196f2955-0686-4b4e-8f6d-c37197996789.jpg?ts=1727434223",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/sliding_images/jpeg/1e2836c3-9b70-48f0-951b-e6e70dac5188.jpg?ts=1727434231"],
  stock: Math.floor(Math.random() * 100),
  unit: "g",
  categoryName: "Sweet Tooth",
},
{
  prodName: "Kinnaur Apple",
  prodDescription: "Kinnaur apples are typically medium to large in size with a smooth, shiny skin that can range from red to yellow-green. They are prized for their quality and are often used for eating fresh, making apple-based desserts, or pressing into juice.",
  price: 120,
  mrp: 150,
  images: ["https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/large_images/jpeg/196f2955-0686-4b4e-8f6d-c37197996789.jpg?ts=1727434223",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/sliding_images/jpeg/1e2836c3-9b70-48f0-951b-e6e70dac5188.jpg?ts=1727434231"],
  stock: Math.floor(Math.random() * 100),
  unit: "kg",
  categoryName: "Fruits and Vegetables",
},
{
  prodName: "Uncle Chipps Spicy Treat Flavour Potato Chips",
  prodDescription: "Who’s in for a roller coaster of spicy flavors and crunchy bites? If you feel like spicing up your day, you need a snack with character and Uncle Chipps Spicy Treat will surely do the trick. Made with high-quality thinly sliced potatoes and topped with mouth-watering seasoning, these chips are just exquisite and will make you come back for more. Enjoy watching your favorite programs with a bag of Uncle Chipps or have this delicious treat on your quick work break. These chips are just perfect to snack on and their irresistible flavor makes them the ideal go-to treat.",
  price: 20,
  mrp: 25,
  images: ["https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/large_images/jpeg/1de15688-2340-4435-92dc-ef5c9d1bdf8a.jpg?ts=1707312314",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/sliding_image/159b.jpg?ts=1654778815"
  ],
  stock: Math.floor(Math.random() * 100),
  unit: "g",
  categoryName: "Snacks and Munchies",
},
{
  prodName: "Amul Butter",
  pordDescription: "Made from the freshest of cream, the Amul butter has wonderful taste which is delicate and slightly salty. This finely processed butter is natural, pure and tastes best with toasts and sandwiches. Has a natural and pure formulation that gives a great taste. Made from fresh cream that has a delicious flavour. Spread it over toast or cook your curries in it for a heavenly taste.",
  price: 50,
  mrp: 60,
  images: ["https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/app/assets/products/large_images/jpeg/1de15688-2340-4435-92dc-ef5c9d1bdf8a.jpg?ts=1707312314",
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/sliding_image/159b.jpg?ts=1654778815"
  ],
  stock: Math.floor(Math.random() * 100),
  unit: "g",
  categoryName: "Dairy and Bakery",
}
];

async function createProduct() {
  try {
    // Clear existing products
    await prisma.product.deleteMany({});

    for (const product of products) {
      const category = await prisma.category.findUnique({
        where: { name: product.categoryName },
      });

      if (category) {
        // First create the product
        const createdProduct = await prisma.product.create({
          data: {
            prodName: product.prodName,
            prodDescription: product.prodDescription ?? "",
            price: product.price,
            mrp: product.mrp,
            stock: product.stock,
            unit: product.unit,
            category: {
              connect: { id: category.id },
            },
          }
        });

        // Then create the images with the product ID
        const imagePromises = product.images.map(imageLink => 
          prisma.productImages.create({
            data: {
              productId: createdProduct.id,
              imageLink: imageLink,
            }
          })
        );

        await Promise.all(imagePromises);
      } else {
        console.error(`Category ${product.categoryName} not found`);
      }
    }

    console.log('Products and images seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}


async function seedDatabase() {
  try {
    await seedUsers();
    await createCategory();
    await createProduct();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();