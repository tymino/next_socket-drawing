import st from './Button.module.sass';
import React, { FC, memo } from 'react';
import { IButtonProps } from '../../types';

const Button: FC<IButtonProps> = ({ name, handleResetCanvas }) => {
  return (
    <button className={st.button} onClick={handleResetCanvas}>
      {name}
    </button>
  );
};

export default memo(Button);
