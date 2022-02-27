import styles from '../styles/Home.module.sass';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';

import { io, Socket } from 'socket.io-client';

const Home: NextPage = () => {
  const [socket] = useState<Socket>(io);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const refCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  useEffect(() => {
    const canvas = refCanvas.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    setCtx(context);
    //Our first draw
    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    console.log(refCanvas);
  }, []);

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => (keys[e.key] = true), false);
    window.addEventListener('keyup', (e) => delete keys[e.key], false);
  }

  let W = 0;
  let H = 0;

  if (typeof window !== 'undefined') {
    W = window.innerWidth;
    H = window.innerHeight;
  }

  const keys: any = {};

  const gameLoop = () => {
    console.log(keys['ArrowUp']);
    
    if (keys['ArrowUp']) {
      socket.emit('pressed', 38);
      console.log('You are UP');
    }
    if (keys['ArrowDown']) {
      socket.emit('pressed', 40);
      console.log('You are DOWN');
    }
    if (keys['ArrowLeft']) {
      socket.emit('pressed', 37);
      console.log('You are LEFT');
    }
    if (keys['ArrowRight']) {
      socket.emit('pressed', 39);
      console.log('You are RIGHT');
    }

    requestAnimationFrame(gameLoop);
  };

  if (typeof window !== 'undefined') {
    requestAnimationFrame(gameLoop);
  }

  useEffect(() => {
    socket.on('welcome', function (currentUser, currentUsers) {
      console.log(currentUser);

      if (!ctx) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'lighter';

      //players in lobby
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
        ctx.arc(
          currentUsers[i].x,
          currentUsers[i].y,
          currentUsers[i].radius,
          Math.PI * 2,
          Math.PI * 2,
          false,
        );
        ctx.fill();
      }

      //player
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
      ctx.arc(currentUser.x, currentUser.y, currentUser.radius, Math.PI * 2, Math.PI * 2);
      ctx.fill();
    });

    //other users get updated with new players when teh new player joins
    socket.on('currentUsers', function (currentUsers) {
      if (!ctx) return;

      ctx.globalCompositeOperation = 'source-over';
      //Lets reduce the opacity of the BG paint to give the final touch
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

      //Lets blend the particle with the BG
      ctx.globalCompositeOperation = 'lighter';

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
        ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, Math.PI * 2);
        ctx.fill();
      }
      console.log('A new User has joined');
    });

    //if a player leaves, everyone gets new set of players
    socket.on('playerLeft', function (currentUsers) {
      if (!ctx) return;

      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      //Lets reduce the opacity of the BG paint to give the final touch
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

      //Lets blend the particle with the BG
      ctx.globalCompositeOperation = 'lighter';

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
        ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, Math.PI * 2);
        ctx.fill();
      }
      console.log('A Player Has left');
    });

    socket.on('PlayersMoving', function (players) {
      if (!ctx) return;

      ctx.globalCompositeOperation = 'source-over';
      //Lets reduce the opacity of the BG paint to give the final touch
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, W, H);

      //Lets blend the particle with the BG
      ctx.globalCompositeOperation = 'lighter';

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
          ctx.arc(players[i].x, players[i].y, players[i].radius, Math.PI * 2, Math.PI * 2);
          ctx.fill();
        }
      };
      allPlayers();
    });
  }, [socket, ctx, H, W]);

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
