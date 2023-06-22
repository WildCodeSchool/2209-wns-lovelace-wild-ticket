export type AppUserFixtures = {
  email: string;
  password: string;
  role: string;
  createdAt: string;
  restaurant?: string;
};

export const AppUserFixtures: AppUserFixtures[] = [
  {
    email: process.env.APP_USER_ADMIN_EMAIL as string,
    password: process.env.APP_USER_ADMIN_PASSWORD as string,
    role: "ROLE_ADMIN",
    createdAt: "2022-12-20T11:00:00",
  },
  {
    email: process.env.APP_USER_RESTAURANT_EMAIL as string,
    password: process.env.APP_USER_RESTAURANT_PASSWORD as string,
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "Butcher Shop",
  },
];
