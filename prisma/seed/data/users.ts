import { hashSync } from "bcrypt";

export const users = [
  {
    fullName: "User TEST",
    email: "user@gmail.com",
    password: hashSync("111111", 10),
    verified: new Date(),
    role: "USER",
  },
  {
    fullName: "Admin TEST",
    email: "admin@gmail.com",
    password: hashSync("111111", 10),
    verified: new Date(),
    role: "ADMIN",
  },
];
