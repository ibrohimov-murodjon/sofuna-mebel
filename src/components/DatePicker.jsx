import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function DatePicker({ filterDateData }) {
  const [value, setValue] = useState({
    start_date: null,
    end_date: null,
  });
  const handleValueChange = (newValue) => {
    setValue(newValue);
    console.log(value);
    fetch(`https://custom.uz/products/order/filter-date/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValue),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        filterDateData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <Datepicker
      classNames="z-10"
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
      configs={{
        shortcuts: {
          today: "Bugun",
          yesterday: "Kecha",
          past: (period) => `Ohirgi-${period} kun`,
          currentMonth: "Hozirgi oy",
          pastMonth: "O'tgan oy",
        },
      }}
      i18n={"uz-latn"}
    />
  );
}
export default DatePicker;
