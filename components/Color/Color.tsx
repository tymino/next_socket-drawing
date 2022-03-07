import st from './Color.module.sass';
import React, { FC } from 'react';

interface IColorProps {
  name: string;
  handleChangeColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Color: FC<IColorProps> = ({ name, handleChangeColor }) => {
  return (
    <div className={st.container}>
      <label htmlFor="color">{name}</label>
      <input type="color" name="color" onChange={handleChangeColor} />
    </div>
  );
};

export default Color;
