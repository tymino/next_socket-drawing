import st from './Color.module.sass';
import React, { FC } from 'react';

import { IColorProps } from '../../types';

const Color: FC<IColorProps> = ({ name, handleChangeColor }) => {
  return (
    <div className={st.container}>
      <label htmlFor="color">{name}</label>
      <input type="color" name="color" onChange={handleChangeColor} />
    </div>
  );
};

export default Color;
