import { utils, write } from "xlsx";
import {
  EXPORT_TICKETS_BY_RESTAURANT_TYPES,
  EXPORT_TICKETS_BY_RESTAURANT_TYPES_NOT_NULL,
} from "../types/DataTypes";

export default class ExportService {
  static restaurantNameToUpperCase = (restaurantName: string) => {
    return restaurantName.toLocaleUpperCase().replace(" ", "-");
  };

  static downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  static exportTickets = (
    data: EXPORT_TICKETS_BY_RESTAURANT_TYPES,
    type: string,
    restaurantName: string
  ) => {
    const date = new Date().toISOString().slice(0, 10);
    restaurantName = this.restaurantNameToUpperCase(restaurantName);
    const filename = `${restaurantName}_EXPORT_TICKETS_${date}.${type}`;
    let blob;

    switch (type) {
      case "csv":
        let csv =
          "__typename,number,name,email,phoneNumber,seats,createdAt,deliveredAt,placedAt,closedAt\n";
        csv += data?.map((row) => Object.values(row).join(",")).join("\n");
        blob = new Blob([csv as string], { type: "text/csv" });
        break;
      case "xlsx":
        const worksheet = utils.json_to_sheet(
          data as EXPORT_TICKETS_BY_RESTAURANT_TYPES_NOT_NULL
        );
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Data");
        blob = new Blob(
          [write(workbook, { type: "array", bookType: "xlsx" })],
          {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }
        );
    }

    blob && this.downloadFile(blob, filename);
  };
}
