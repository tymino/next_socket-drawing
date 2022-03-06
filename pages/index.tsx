import st from '../styles/Home.module.sass';
import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Canvas } from '../components';

import type { NextPage } from 'next';
import { IPositionBrush, IStrokes, NameSocket } from '../types';

const Home: NextPage = () => {
  const [socket] = useState<Socket>(io);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const refCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  const [isBrushDown, setIsBrushDown] = useState<boolean>(false);
  const [clientStroke, setClientStroke] = useState<IStrokes>({
    color: '#fff',
    size: 2,
    points: [],
  });

  // Перевести в компонент canvas
  // Добавить кнопку "очиски листа"
  // Инпут с цветами
  // Инпут с размером кисти
  // ? Кисть - ластик

  const draw = useCallback(
    (stroke: IStrokes) => {
      if (!ctx) return;

      ctx.lineWidth = stroke.size;
      ctx.strokeStyle = stroke.color;

      ctx.beginPath();

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      stroke.points.forEach((point: IPositionBrush) => ctx.lineTo(point.x, point.y));

      ctx.stroke();
      ctx.closePath();
    },
    [ctx],
  );

  const sendStrokes = async (data: IStrokes) => socket.emit(NameSocket.Draws, data);

  const handleMouseEvent = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const position: IPositionBrush = { x: e.pageX, y: e.pageY };

    clientStroke.points.push(position);

    draw(clientStroke);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsBrushDown(true);
    handleMouseEvent(e);
  };

  const handleMouseUp = () => {
    setIsBrushDown(false);
    sendStrokes(clientStroke);
    setClientStroke({ ...clientStroke, points: [] });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isBrushDown) handleMouseEvent(e);
  };

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');

    if (context) {
      setCtx(context);
      context.fillStyle = '#000000';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, []);

  useEffect(() => {
    socket.on(NameSocket.Сoloring, (serverData: IStrokes) => {
      draw(serverData);
    });
  }, [socket, draw]);

  return (
    <div className={st.container}>
      <Head>
        <title>Drawing | Socket.io</title>
        <meta name="description" content="Drawing Socket.io Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={st.container}>
        <div className={st.options}>
          <label htmlFor="color">
            color
            <input
              type="color"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
            />
          </label>

          <label htmlFor="size">
            size
            <input type="range" name="size" />
          </label>

          <button>Reset</button>
        </div>

        <Canvas
          reference={refCanvas}
          width="500"
          height="500"
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
};

export default Home;
