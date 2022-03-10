import st from './Canvas.module.sass';
import React, { FC } from 'react';

import { ICanvasProps, IMouseTouchEvent } from '../../types';

const Canvas: FC<ICanvasProps> = ({
  reference,
  width,
  height,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
}) => {
  const handleTouchStart = (e: IMouseTouchEvent) => {
    handleMouseDown(e);
  };

  const handleTouchMove = (e: IMouseTouchEvent) => {
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
