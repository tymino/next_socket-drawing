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

  // const [keys, setKeys] = useState<any>({
  //   [NameKeys.Down]: false,
  //   [NameKeys.Up]: false,
  //   [NameKeys.Left]: false,
  //   [NameKeys.Right]: false,
  // });

  const keys: any = {};

  const handleKeyDown = (e: any) => (keys[e.key] = true);
  const handleKeyUp = (e: any) => (keys[e.key] = false);

  useKey(NameKeyStatus.KeyDown, NameKeys.Down, handleKeyDown);
  useKey(NameKeyStatus.KeyUp, NameKeys.Down, handleKeyUp);

  const draw = () => {};

  const gameLoop = () => {
    if (keys[NameKeys.Up]) socket.emit('pressed', NameKeys.Up);
    if (keys[NameKeys.Down]) socket.emit('pressed', NameKeys.Down);
    if (keys[NameKeys.Left]) socket.emit('pressed', NameKeys.Left);
    if (keys[NameKeys.Right]) socket.emit('pressed', NameKeys.Right);

    requestAnimationFrame(gameLoop);
  };

  if (typeof window !== 'undefined') requestAnimationFrame(gameLoop);

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    setCtx(context);
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e: any) => (keys[e.key] = true);
  //   const handleKeyUp = (e: any) => (keys[e.key] = false);

  //   console.log(keys);

  //   window.addEventListener('keydown', handleKeyDown);
  //   window.addEventListener('keyup', handleKeyUp);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, []);

  useEffect(() => {
    socket.on('welcome', (currentUser, users) => {
      if (!ctx) return;
      console.log('user', currentUser);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (var i = 0; i < users.length; i++) {
        ctx.beginPath();

        var gradient = ctx.createRadialGradient(
          users[i].x,
          users[i].y,
          0,
          users[i].x,
          users[i].y,
          users[i].radius,
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.4, 'white');
        gradient.addColorStop(0.4, users[i].color);
        gradient.addColorStop(1, 'black');

        ctx.fillStyle = gradient;
        ctx.arc(users[i].x, users[i].y, users[i].radius, Math.PI * 2, Math.PI * 2, false);
        ctx.fill();
      }

      ctx.beginPath();
      //Time for some colors
      var gradient = ctx.createRadialGradient(
        currentUser.x,
        currentUser.y,
        0,
        currentUser.x,
        currentUser.y,
        currentUser.radius,
      );
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(0.4, 'white');
      gradient.addColorStop(0.4, currentUser.color);
      gradient.addColorStop(1, 'black');

      ctx.fillStyle = gradient;
      ctx.arc(currentUser.x, currentUser.y, currentUser.radius, Math.PI * 2, 0, false);
      ctx.fill();
    });

    //other users get updated with new players when teh new player joins
    socket.on('currentUsers', (currentUsers) => {
      if (!ctx) return;

      // ctx.globalCompositeOperation = 'source-over';
      //Lets reduce the opacity of the BG paint to give the final touch
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

      //Lets blend the particle with the BG
      // ctx.globalCompositeOperation = 'lighter';

      for (var i = 0; i < currentUsers.length; i++) {
        ctx.beginPath();

        //Time for some colors
        var gradient = ctx.createRadialGradient(
          currentUsers[i].x,
          currentUsers[i].y,
          0,
          currentUsers[i].x,
          currentUsers[i].y,
          currentUsers[i].radius,
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.4, 'white');
        gradient.addColorStop(0.4, currentUsers[i].color);
        gradient.addColorStop(1, 'black');

        ctx.fillStyle = gradient;
        ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, 0, false);
        ctx.fill();
      }
    });

    //if a player leaves, everyone gets new set of players
    socket.on('playerLeft', (currentUsers) => {
      if (!ctx) return;

      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // ctx.globalCompositeOperation = 'source-over';
      //Lets reduce the opacity of the BG paint to give the final touch
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

      //Lets blend the particle with the BG
      // ctx.globalCompositeOperation = 'lighter';

      for (var i = 0; i < currentUsers.length; i++) {
        ctx.beginPath();

        //Time for some colors
        var gradient = ctx.createRadialGradient(
          currentUsers[i].x,
          currentUsers[i].y,
          0,
          currentUsers[i].x,
          currentUsers[i].y,
          currentUsers[i].radius,
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.4, 'white');
        gradient.addColorStop(0.4, currentUsers[i].color);
        gradient.addColorStop(1, 'black');

        ctx.fillStyle = gradient;
        ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, 0, false);
        ctx.fill();
      }
      console.log('A Player Has left');
    });

    socket.on('PlayersMoving', (players) => {
      if (!ctx) return;

      // ctx.globalCompositeOperation = 'source-over';
      //Lets reduce the opacity of the BG paint to give the final touch
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      //Lets blend the particle with the BG
      // ctx.globalCompositeOperation = 'lighter';

      var players = players;
      var i = 0;

      const allPlayers = () => {
        for (i; i < players.length; i++) {
          ctx.beginPath();

          //Time for some colors
          var gradient = ctx.createRadialGradient(
            players[i].x,
            players[i].y,
            0,
            players[i].x,
            players[i].y,
            players[i].radius,
          );
          gradient.addColorStop(0.5, 'white');
          gradient.addColorStop(0.5, players[i].color);
          gradient.addColorStop(1, 'black');

          ctx.fillStyle = gradient;
          ctx.arc(players[i].x, players[i].y, players[i].radius, Math.PI * 2, 0, false);
          ctx.fill();
        }
      };
      allPlayers();
    });
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
