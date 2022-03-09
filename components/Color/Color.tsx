import st from './Color.module.sass';
import React, { FC, memo } from 'react';

import { IColorProps } from '../../types';

const Color: FC<IColorProps> = ({ name, defaultColor, handleChangeColor }) => {
  return (
    <div className={st.container}>
      <label htmlFor="color">{name}</label>
      <input type="color" name="color" value={defaultColor} onChange={handleChangeColor} />
    </div>
  );
};

export default memo(Color);
