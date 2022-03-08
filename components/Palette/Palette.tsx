import st from './Palette.module.sass';
import React, { FC } from 'react';

interface IPalette {
  eraserState: [isEraser: boolean, setIsEraser: React.Dispatch<React.SetStateAction<boolean>>];
}

const Palette: FC<IPalette> = ({ eraserState: [isEraser, setIsEraser] }) => {
  return <div className={st.container}></div>;
};

export default Palette;
