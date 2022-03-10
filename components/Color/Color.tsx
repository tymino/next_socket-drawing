import st from './Color.module.sass';
import React, { FC, memo } from 'react';

import { IColorProps } from '../../types';

const Color: FC<IColorProps> = ({ name, defaultColor, handleChangeColor }) => {
  return (
    <div className={st.container}>
      <label className={st.label} htmlFor="color">{name}</label>
      <input className={st.input} type="color" name="color" value={defaultColor} onChange={handleChangeColor} />
    </div>
  );
};

export default memo(Color);
