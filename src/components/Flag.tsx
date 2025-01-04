import { getCode } from "country-list";
import { FlagUsage } from "../types/FlagUsage";
import { Location } from "../types/Location";
import "./Flag.css";

type FlagProps = {
  location: Location;
  usage: FlagUsage;
};

export const Flag = ({ location, usage }: FlagProps): JSX.Element => {
  let code = getCode(location.country) || "";
  if (["USA", "United States"].includes(location.country)) {
    code = "US";
  } else if (location.country === "UK") {
    code = "GB";
  } else if (location.country === "UAE") {
    code = "AE";
  }

  return (
    <>
      <span className={`fi fi-${code.toLowerCase()} fi-${usage}`} />
    </>
  );
};
