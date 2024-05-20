import { MouseEventHandler } from "react";

type Props = {
  onPullLeft: MouseEventHandler<HTMLButtonElement>;
  onPullRight: MouseEventHandler<HTMLButtonElement>;
};
const Control = (props: Props) => {
  const { onPullLeft, onPullRight } = props;
  return (
    <div>
      <button onClick={onPullLeft}> PULL LEFT </button>
      <button onClick={onPullRight}> PULL RIGHT </button>
    </div>
  );
};

export default Control;
