import { Center, Loader } from "@mantine/core";

export const CustomLoader = (): JSX.Element => {
  return (
    <>
      <Center style={{ height: "30vh" }}>
        <Loader
          color={"red"}
          size={"xl"}
          type={"dots"}
        />
      </Center>
    </>
  );
};
