import SVGIconPlacedTicket from "../../../SVG/SVGIconPlacedTicket/SVGIconPlacedTicket";
import SVGIconWaitingTicket from "../../../SVG/SVGIconWaitingTicket/SVGIconWaitingTicket";
import "./DashboardTicketListStatus.scss";

export default function DashboardTicketListStatus({dataDate}: {dataDate: Date}) {
  if (dataDate === null) {
    return (
      <div className="DashboardTicketListStatusContainer">
        <SVGIconWaitingTicket />
        <p className="DashboardTicketListStatusText">En attente</p>
      </div>
    );
  }
  return (
    <div className="DashboardTicketListStatusContainer">
    <SVGIconPlacedTicket />
    <p className="DashboardTicketListStatusText">À table</p>
  </div>
  )
}
