const convertDate = (dateNow: Date) => {
  const locale = "fr";

  const day = dateNow.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${dateNow.getDate()} ${dateNow.toLocaleDateString(
    locale,
    { month: "long", year: "numeric" }
  )}`;

  const time = dateNow.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric",
  });

  return {
    date,
    time,
  };
};

export default convertDate;
