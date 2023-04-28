import { DateRangePicker } from "rsuite";
import isAfter from "date-fns/isAfter";
import "./DashboardStatsExportModal.scss";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useState } from "react";
import { DateRange, ValueType } from "rsuite/esm/DateRangePicker";
import { InfinitySpin } from "react-loader-spinner";

const DashboardStatsExportModal = ({
  openExportModal,
  handleExport,
  type,
  loading,
}: {
  openExportModal: boolean;
  handleExport: any;
  type: string;
  loading: boolean;
}) => {
  const [value, setValue] = useState<ValueType | null>(null);
  return (
    <div
      className={
        openExportModal
          ? "DashboardStatsListModal DashboardStatsListModalHidden"
          : "DashboardStatsListModalHidden"
      }
    >
      <h1 className="dashboardStatsListModalTitle">Sélectionnez vos dates</h1>
      <DateRangePicker
        format="dd-MM-yyyy"
        shouldDisableDate={(date) => isAfter(date, new Date())}
        onChange={(value) => setValue(value)}
        placement="auto"
        value={value as DateRange}
      />
      <button
        onClick={() => {
          handleExport(value);
          setValue(null);
        }}
        className={
          value
            ? "DashboardStatsListModalButton DashboardStatsListModalButtonActive"
            : "DashboardStatsListModalButton"
        }
        disabled={value ? false : true}
      >
        {loading ? (
          <div className="DashboardStatsListModalLoadingSpinner">
            <InfinitySpin width="100" color="#d1d5db" />
          </div>
        ) : (
          `Exporter au format ${type.toLocaleUpperCase()}`
        )}
      </button>
    </div>
  );
};

export default DashboardStatsExportModal;
