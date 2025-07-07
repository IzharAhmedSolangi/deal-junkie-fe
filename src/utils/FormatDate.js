export const FormatDate = (isoDate) => {
  if (isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } else {
    return "-";
  }
};

export const FormatDateAndTime = (dateString) => {
  if (dateString) {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else {
    return "-";
  }
};

export const FormatDate2 = (date) => {
  if (date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  } else {
    return "-";
  }
};
