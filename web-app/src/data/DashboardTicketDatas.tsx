import SVGIconForks from "../components/SVG/SVGIconForks/SVGIconForks";

export const TicketsHeadTabContent: string[] = [
  "N° Ticket",
  "Nom",
  "Couverts",
  "Temps d'attente",
  "Statut",
  "Actions",
];

export const TicketsFilterTabContent = [
  {
    buttonContent: (
      <>
        <SVGIconForks />1 - 2
      </>
    ),
    seats: 2,
  },
  {
    buttonContent: (
      <>
        <SVGIconForks />3 - 4
      </>
    ),
    seats: 4,
  },
  {
    buttonContent: (
      <>
        <SVGIconForks />5 - 6
      </>
    ),
    seats: 6,
  },
  {
    buttonContent: (
      <>
        <SVGIconForks />7 - 8
      </>
    ),
    seats: 8,
  },
  {
    buttonContent: "Tous les tickets",
    seats: null,
  },
];
