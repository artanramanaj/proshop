import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin user",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "john doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "jane doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;
