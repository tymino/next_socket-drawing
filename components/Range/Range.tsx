import st from './Range.module.sass';
import React, { FC, memo } from 'react';

import { IRangeProps } from '../../types';

const Range: FC<IRangeProps> = ({ name, minValue, maxValue, size, handleChangeSize }) => {
  return (
    <div className={st.container}>
      <div className={st.wrapper}>
        <label className={st.label} htmlFor="size">
          {name}
        </label>
        <div className={st.value}>{size}</div>
      </div>

      <input
        className={st.input}
        type="range"
        name="size"
        step={1}
        min={minValue}
        max={maxValue}
        value={size}
        onChange={handleChangeSize}
      />
    </div>
  );
};

export default memo(Range);
