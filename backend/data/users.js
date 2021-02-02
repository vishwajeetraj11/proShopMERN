import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@groceryshop.io',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Vishwajeet Raj',
    email: 'vishwajeet@groceryshop.io',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'anyone',
    email: 'anyone@groceryshop.io',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
