import { getCode } from "country-list";
import { Location } from "../types/Location";
import "./Flag.css";

export function Flag({ location }: { location: Location }) {
  let code = getCode(location.country) || "";
  if ([ "USA", "United States" ].includes(location.country)) {
    code = "US";
  } else if (location.country === "UK") {
    code = "GB";
  } else if (location.country === "UAE") {
    code = "AE";
  }

  return (
    <>
      <span className={`fi fi-${code.toLowerCase()}`}/>
    </>
  );
}
