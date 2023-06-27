export type AppUserFixtures = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  restaurant?: string;
};

export const AppUserFixtures: AppUserFixtures[] = [
  {
    firstname: "John",
    lastname: "Lesuperadmin",
    email: process.env.APP_USER_ADMIN_EMAIL as string,
    password: process.env.APP_USER_ADMIN_PASSWORD as string,
    role: "ROLE_SUPER_ADMIN",
    createdAt: "2022-12-20T11:00:00",
  },
  {
    firstname: "John",
    lastname: "Lerestaurateur",
    email: process.env.APP_USER_RESTAURANT_EMAIL as string,
    password: process.env.APP_USER_RESTAURANT_PASSWORD as string,
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "Butcher Shop",
  },
];
