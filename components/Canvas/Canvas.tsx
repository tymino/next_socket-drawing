import st from './Canvas.module.sass';
import React, { FC } from 'react';

interface ICanvasProps {
  reference: React.MutableRefObject<HTMLCanvasElement>;
  width: string;
  height: string;
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleMouseUp: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}

const Canvas: FC<ICanvasProps> = ({ reference, width, height, handleMouseDown, handleMouseUp, handleMouseMove }) => {
  return (
    <canvas
      ref={reference}
      className={st.canvas}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      {' '}
      Your Browser Does Not Support Canvas and HTML5{' '}
    </canvas>
  );
};

export default Canvas;
