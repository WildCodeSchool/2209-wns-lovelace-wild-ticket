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
    email: "vincent@r-ticket.agtn.fr",
    password: "Vincent69!",
    role: "ROLE_ADMIN",
    createdAt: "2022-12-20T11:00:00",
    poles: ["Pôle de Lyon"],
  },
  {
    login: "Estelle",
    email: "estelle@r-ticket.agtn.fr",
    password: "Estelle69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "Le Bouchon Végé",
  },
  {
    login: "Anthony",
    email: "anthony@r-ticket.agtn.fr",
    password: "Anthony69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "Lardonnaise",
  },
  {
    login: "Michel",
    email: "michel.lardonnaise@r-ticket.agtn.fr",
    password: "Michel69!",
    role: "ROLE_RESTAURANT",
    createdAt: "2022-12-20T11:00:00",
    restaurant: "La Galette Flambée",
  },
];
