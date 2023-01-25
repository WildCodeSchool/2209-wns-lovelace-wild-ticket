export type AppUserFixtures = {
  login: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  poles?: string[];
  restaurant?: string;
};

export const AppUserFixtures: AppUserFixtures[] = [
  {
    login: "Vincent",
    email: "vincent@r-ticket.com",
    password: "Vincent69!",
    role: "ROLE_ADMIN",
    createdAt: "2022-12-03 16:08:00",
    poles: ["Pôle de Lyon"],
  },
  {
    login: "Estelle",
    email: "estelle@r-ticket.com",
    password: "Estelle69!",
    role: "ROLE_ADMIN",
    createdAt: "2022-12-03 16:08:00",
    poles: ["Pôle de Marseille"],
  },
  {
    login: "Anthony",
    email: "anthony@r-ticket.com",
    password: "Anthony69!",
    role: "ROLE_ADMIN",
    createdAt: "2022-12-03 16:08:00",
    poles: ["Pôle de Brest"],
  },
  {
    login: "Michel",
    email: "michel@lardonnaise.com",
    password: "Michel69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-03 16:08:00",
    restaurant: "Lardonaise",
  },
];
