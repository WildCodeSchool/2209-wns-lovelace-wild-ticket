import {
  DASHBOARD_HOME,
  DASHBOARD_OPTIONS,
  DASHBOARD_POLE,
  DASHBOARD_RESTAURANT,
  DASHBOARD_STATS,
  DASHBOARD_TABLE,
  DASHBOARD_TICKET,
  DASHBOARD_USER,
} from "../../../pages/paths";

export const headerLocation = (location: string): string => {
  switch (location) {
    case DASHBOARD_HOME:
      return "Accueil";
    case DASHBOARD_OPTIONS:
      return "Configuration";
    case DASHBOARD_POLE:
      return "Pôles restaurateurs";
    case DASHBOARD_RESTAURANT:
      return "Restaurants";
    case DASHBOARD_STATS:
      return "Statistiques";
    case DASHBOARD_TABLE:
      return "Tables";
    case DASHBOARD_TICKET:
      return "File d'attente";
    case DASHBOARD_USER:
      return "Utilisateurs";
    default:
      return "Oups !";
  }
};
