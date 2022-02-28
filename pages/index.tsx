import styles from '../styles/Home.module.sass';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import useKey from '../hooks/useKey';

import type { NextPage } from 'next';
import { NameSocket, NameKeys, NameKeyStatus } from '../types';

const Home: NextPage = () => {
  const [socket] = useState<Socket>(io);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const refCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  // const [keys, setKeys] = useState<{ [key: string]: boolean }>({
  //   [NameKeys.Up]: false,
  //   [NameKeys.Down]: false,
  //   [NameKeys.Left]: false,
  //   [NameKeys.Right]: false,
  // });

  // useKey(NameKeyStatus.KeyDown, NameKeys.Down, (e: any) => (keys[e.key] = true));
  // useKey(NameKeyStatus.KeyUp, NameKeys.Down, (e: any) => (keys[e.key] = false));

  const draw = () => {};

  // const gameLoop = () => {
  //   if (keys[NameKeys.Up]) socket.emit('pressed', NameKeys.Up);
  //   if (keys[NameKeys.Down]) socket.emit('pressed', NameKeys.Down);
  //   if (keys[NameKeys.Left]) socket.emit('pressed', NameKeys.Left);
  //   if (keys[NameKeys.Right]) socket.emit('pressed', NameKeys.Right);

  //   console.log(keys);

  //   requestAnimationFrame(gameLoop);
  // };

  // if (typeof window !== 'undefined') requestAnimationFrame(gameLoop);

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    setCtx(context);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    socket.on('welcome', (currentUser, users) => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });

    //other users get updated with new players when teh new player joins
    socket.on('currentUsers', (currentUsers) => {});
    //if a player leaves, everyone gets new set of players
  }, [socket, ctx]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Drawing | Socket.io</title>
        <meta name="description" content="Drawing Socket.io Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas ref={refCanvas} id="canvas" width="500" height="500">
        {' '}
        Your Browser Does Not Support Canvas and HTML5{' '}
      </canvas>
    </div>
  );
};

export default Home;
