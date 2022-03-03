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

  const draw = (strokeData: any) => {
    if (!ctx) return;
    ctx.lineCap = 'round';

    strokeData.forEach((stroke: any) => {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (var j = 0; j < stroke.points.length; j++) {
        var p = stroke.points[j];
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    });
  };

  const sendPoints = async (data: any) => {
    socket.emit(NameSocket.Draws, data);
  };

  const handleMouseEvent = (e: any) => {
    const localX = e.pageX;
    const localY = e.pageY;

    const data = { x: localX, y: localY };

    const currentStroke: any = {
      color: '#fff',
      size: 10,
      points: [],
    };
    currentStroke.points.push(data);

    setStrokes([...strokes, currentStroke]);

    draw([...strokes, currentStroke]);
  };

  const handleMouseDown = (e: any) => {
    brush.down = true;
    handleMouseEvent(e);
  };

  const handleMouseUp = (e: any) => {
    brush.down = false;
    sendPoints(strokes);
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
      setStrokes(data);

      if (!ctx) return;
      ctx.lineCap = 'round';

      data.forEach((stroke: any) => {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;

        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (var j = 0; j < stroke.points.length; j++) {
          var p = stroke.points[j];
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
    });
  }, [socket, ctx]);

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
