import st from './Canvas.module.sass';
import React, { FC } from 'react';

interface ICanvasProps {
  reference: React.MutableRefObject<HTMLCanvasElement>;
  width: string;
  height: string;
  handleMouseDown: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  handleMouseUp: () => void;
}

const Canvas: FC<ICanvasProps> = ({
  reference,
  width,
  height,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
}) => {
  const handleTouchStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    handleMouseDown(e);
  };

  const handleTouchMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    handleMouseMove(e);
  };
  
  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <canvas
      ref={reference}
      className={st.canvas}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      {' '}
      Your Browser Does Not Support Canvas and HTML5{' '}
    </canvas>
  );
};

export default Canvas;
