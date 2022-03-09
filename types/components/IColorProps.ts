interface IColorProps {
  name: string;
  defaultColor: string;
  handleChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default IColorProps;
