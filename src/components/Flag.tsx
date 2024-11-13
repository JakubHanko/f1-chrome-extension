import { getCode } from "country-list";
import ReactCountryFlag from "react-country-flag";
import { Location } from "../types/Location";

export function Flag({ location }: { location: Location }) {
  let code = getCode(location.country) || "";
  if ([ "USA", "United States" ].includes(location.country)) {
    code = "US";
  } else if (location.country === "UK") {
    code = "GB";
  } else if (location.country === "UAE") {
    code = "AE";
  }

  return <ReactCountryFlag
    countryCode={code}
    style={{
      fontSize: "4em",
      lineHeight: "1em"
    }}
  />;
}
