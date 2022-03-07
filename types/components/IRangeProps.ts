interface IRangeProps {
  name: string;
  minValue: number;
  maxValue: number;
  size: number;
  handleChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default IRangeProps;
