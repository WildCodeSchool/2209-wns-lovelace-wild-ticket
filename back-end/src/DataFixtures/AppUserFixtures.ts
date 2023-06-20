export type AppUserFixtures = {
  email: string;
  password: string;
  role: string;
  createdAt: string;
  poles?: string[];
  restaurant?: string;
};

export const AppUserFixtures: AppUserFixtures[] = [
  {
    email: "vincent@r-ticket.agtn.fr",
    password: "Vincent69!",
    role: "ROLE_ADMIN",
    createdAt: "2022-12-20T11:00:00",
    poles: ["Pôle de Lyon"],
  },
  {
    email: "estelle@r-ticket.agtn.fr",
    password: "Estelle69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "Pura Vegan",
  },
  {
    email: "anthony@r-ticket.agtn.fr",
    password: "Anthony69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "La Suzette",
  },
  {
    email: "michel.lardonnaise@r-ticket.agtn.fr",
    password: "Michel69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "Butcher Shop",
  },
];
