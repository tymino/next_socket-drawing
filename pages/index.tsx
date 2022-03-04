import styles from '../styles/Home.module.sass';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { NextPage } from 'next';
import { IPositionBrush, IBrush, IStrokes, NameSocket } from '../types';

const Home: NextPage = () => {
  const [socket] = useState<Socket>(io);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const refCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  const [activeBrush, setActiveBrush] = useState<IBrush>({
    color: '#fff',
    size: 10,
    down: false,
  });
  const [strokes, setStrokes] = useState<IStrokes[]>([]);

  /*
    Переписать логику строк
    Сервер должен получать текущую линию и рассылать ее всем, а клиент должен ее "стакать" с имеющимися.
    Сервер не обязан знать о всех линиях клиента
    Сервер просто должен пересылать линию от клиента всем подключенным пользователям
  */

  const sendStrokes = async (data: IStrokes[]) => socket.emit(NameSocket.Draws, data);

  const handleMouseEvent = (e: any) => {
    const position: IPositionBrush = { x: e.pageX, y: e.pageY };

    const currentStroke: IStrokes = {
      color: '#fff',
      size: 10,
      points: [],
    };
    currentStroke.points.push(position);

    setStrokes([...strokes, currentStroke]);
  };

  const handleMouseDown = (e: any) => {
    activeBrush.down = true;
    handleMouseEvent(e);
  };

  const handleMouseUp = (e: any) => {
    activeBrush.down = false;
    sendStrokes(strokes);
  };
  const handleMouseMove = (e: any) => {
    if (e.button === 0) console.log(e.button);

    if (activeBrush.down) handleMouseEvent(e);
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
    socket.on(NameSocket.Сoloring, (data: IStrokes[]) => {
      setStrokes(data);
    });
  }, [socket]);

  useEffect(() => {
    if (ctx) {
      ctx.lineCap = 'round';

      ctx.beginPath();

      strokes.forEach((stroke: IStrokes) => {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        stroke.points.forEach((point: IPositionBrush) => ctx.lineTo(point.x, point.y));

        ctx.stroke();
        ctx.closePath();
      });
    }
  }, [strokes, ctx]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Drawing | Socket.io</title>
        <meta name="description" content="Drawing Socket.io Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas
        ref={refCanvas}
        id="canvas"
        width="500"
        height="500"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
        {' '}
        Your Browser Does Not Support Canvas and HTML5{' '}
      </canvas>
    </div>
  );
};

export default Home;
