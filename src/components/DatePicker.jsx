import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function DatePicker({ filterDateData, setUiData, data }) {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  console.log("newValue:", value);
  const handleValueChange = (newValue) => {
    console.log(newValue, "newValue:");
    if (newValue.startDate !== null && newValue.endDate !== null) {
      setValue(newValue);
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
    } else {
      setValue({
        startDate: null,
        endDate: null,
      });
      filterDateData(data);
    }
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
