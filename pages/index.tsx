import styles from '../styles/Home.module.sass';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { NextPage } from 'next';
import { NameSocket } from '../types';

const Home: NextPage = () => {
  const [socket] = useState<Socket>(io);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const refCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  const [brush, setBrush] = useState({
    x: 0,
    y: 0,
    color: '#fff',
    size: 10,
    down: false,
  });
  const [strokes, setStrokes] = useState<any>([]);

  let currentStroke: any = {
    color: '#fff',
    size: 10,
    points: [],
  };

  const draw = () => {
    if (!ctx) return;
    ctx.lineCap = 'round';

    for (let i = 0; i < strokes.length; i++) {
      const s = strokes[i];
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (var j = 0; j < s.points.length; j++) {
        var p = s.points[j];
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
  };

  const sendPoints = async (data: any) => {
    socket.emit(NameSocket.Draws, { x: data.x, y: data.y });
  };

  const handleMouseEvent = (e: any) => {
    const localX = e.pageX;
    const localY = e.pageY;

    const data = { x: localX, y: localY };

    currentStroke.points.push(data);

    sendPoints(data);

    draw();
  };

  const handleMouseDown = (e: any) => {
    brush.down = true;

    currentStroke = {
      color: '#fff',
      size: 10,
      points: [],
    };

    strokes.push(currentStroke);

    handleMouseEvent(e);
  };

  const handleMouseUp = (e: any) => {
    brush.down = false;
    currentStroke = null;
    // handleMouseEvent(e);
  };
  const handleMouseMove = (e: any) => {
    if (brush.down) handleMouseEvent(e);
  };

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    setCtx(context);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    socket.on(NameSocket.Сoloring, (data) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      currentStroke = {
        color: '#fff',
        size: 10,
        points: [],
      };

      strokes.push(currentStroke);

      currentStroke.points.push({
        x: data.x,
        y: data.y,
      });

      draw();
    });
  }, [currentStroke.points, draw, socket]);

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
