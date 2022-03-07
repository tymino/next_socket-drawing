import st from '../styles/Home.module.sass';
import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Canvas, Color, Range } from '../components';

import type { NextPage } from 'next';
import { IPositionBrush, IStrokes, NameSocket, IMouseTouchEvent } from '../types';

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

      ctx.lineCap = 'round';
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

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientStroke({
      ...clientStroke,
      color: e.target.value,
    });
  };

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientStroke({
      ...clientStroke,
      size: Number(e.target.value),
    });
  };

  const handleResetCanvas = () => {
    if (ctx) {
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  const handleMouseEvent = (e: IMouseTouchEvent) => {
    e.persist();

    let posX = 0;
    let posY = 0;

    if (e.nativeEvent instanceof TouchEvent) {
      posX = e.nativeEvent.touches[0].pageX - refCanvas.current.getBoundingClientRect().x;
      posY = e.nativeEvent.touches[0].pageY - refCanvas.current.getBoundingClientRect().y;
    }

    if (e.nativeEvent instanceof MouseEvent) {
      posX = e.nativeEvent.pageX - refCanvas.current.getBoundingClientRect().x;
      posY = e.nativeEvent.pageY - refCanvas.current.getBoundingClientRect().y;
    }

    const position: IPositionBrush = { x: posX, y: posY };

    clientStroke.points.push(position);

    draw(clientStroke);
  };

  const handleMouseDown = (e: IMouseTouchEvent) => {
    setIsBrushDown(true);
    handleMouseEvent(e);
  };

  const handleMouseUp = () => {
    setIsBrushDown(false);
    sendStrokes(clientStroke);
    setClientStroke({
      ...clientStroke,
      points: [],
    });
  };

  const handleMouseMove = (e: IMouseTouchEvent) => {
    if (isBrushDown) handleMouseEvent(e);
  };

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');

    if (context) {
      setCtx(context);
      context.fillStyle = '#a3a3a3';
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
          <Color name="Color" handleChangeColor={handleChangeColor} />

          <Range
            name="Size"
            minValue={1}
            maxValue={10}
            size={clientStroke.size}
            handleChangeSize={handleChangeSize}
          />

          <button onClick={handleResetCanvas}>Reset</button>
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
