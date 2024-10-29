import { AppError } from "@server/utils/error.js";
import prisma from "@server/utils/prisma.js";
import { hashPassword, comparePassword } from "@server/utils/security.js";

export const register = async (email: string, password: string) => {
  // check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    throw new AppError("Invalid password", 400);
  }

  return user;
};

export const recordAuthActivity = async (
  userId: string,
  action: "LOGIN" | "LOGOUT"
) => {
  await prisma.authHistory.create({
    data: {
      userId,
      action,
    },
  });
};
