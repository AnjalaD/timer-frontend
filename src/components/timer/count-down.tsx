export type CountDownProps = {
  time: number;
};

export const CountDown = ({ time }: CountDownProps) => {
  // convert int to xx:xx:xx format
  const formatted = new Date(time * 1000).toISOString().substring(11, 19);

  return <div className="text-9xl font-semibold font-mono">{formatted}</div>;
};
