import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ConstructorStats = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>
    </>
  );
};

export default ConstructorStats;
