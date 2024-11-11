import { ArrowDirection } from "./ArrowDirection";

type Props = { direction: ArrowDirection, clicked: () => void };

const Arrow: React.FC<Props> = (props: Props) => {
  return (
    <>
      <button onClick={props.clicked}>
        {props.direction === ArrowDirection.LEFT ? "<" : ">"}
      </button>
    </>
  );
};

export default Arrow;
