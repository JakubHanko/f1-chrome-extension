import { Center, Loader } from "@mantine/core";

export const CustomLoader = (): JSX.Element => {
  return (
    <>
      <Center style={{ height: "30vh" }}>
        <Loader
          size="xl"
          color="red"
          type="dots"
        />
      </Center>
    </>
  );
};
