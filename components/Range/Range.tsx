import st from './Range.module.sass';
import React, { FC } from 'react';

interface IRangeProps {
  name: string;
  minValue: number;
  maxValue: number;
  size: number;
  handleChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Range: FC<IRangeProps> = ({ name, minValue, maxValue, size, handleChangeSize }) => {
  return (
    <div className={st.container}>
      <label className={st.label} htmlFor="size">
        {name}
      </label>
      <div className={st.wrapper}>
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
        <div className={st.value}>{size}</div>
      </div>
    </div>
  );
};

export default Range;