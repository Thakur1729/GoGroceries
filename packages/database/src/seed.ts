import { prisma } from "./client";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    id: 1,
    name: "Tim Apple" as string,
    email: "tim@apple.com",
    password: "sgwfwrw32"
  },
] as Array<Partial<User>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            id: user.id,
          },
          update: {
            ...user,
          },
          create: {
            id: user.id!,
            name: user.name!,
            email: user.email!,
            password: user.password!,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();