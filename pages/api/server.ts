// import { Server } from "socket.io";
// // Import dependencies
// import express from "express";
// import http from "http";
// import { v4 as uuidv4 } from "uuid";

// // Initialize app and server
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Set up game state and sessions
// interface GameState {
//   players: string[];
//   board: string[];
// }

// interface Sessions {
//   [key: string]: string;
// }

// const games: { [key: string]: GameState } = {};
// const sessions: Sessions = {};

// // Set up Socket.IO events
// io.on("connection", (socket: any) => {
//   console.log("A user has connected");

//   // Join game event
//   socket.on("join game", (sessionId: string) => {
//     if (!sessions[sessionId]) {
//       // Create new session if it doesn't exist
//       const gameId = uuidv4();
//       sessions[sessionId] = gameId;
//       games[gameId] = {
//         players: [socket.id],
//         board: generateBoard(),
//       };
//       socket.emit("joined game", sessionId, gameId, 1, games[gameId].board);
//     } else {
//       // Join existing session
//       const gameId = sessions[sessionId];
//       if (games[gameId].players.length < 2) {
//         games[gameId].players.push(socket.id);
//         socket.emit("joined game", sessionId, gameId, 2, games[gameId].board);
//         io.to(gameId).emit("start game");
//         socket.join(gameId);
//       } else {
//         // Session is full
//         socket.emit("session full");
//       }
//     }
//   });

//   // Flip card event
//   socket.on("flip card", (gameId: string, cardIndex: number) => {
//     // Game logic here
//     io.to(gameId).emit("card flipped", cardIndex);
//   });

//   // End game event
//   socket.on("end game", (gameId: string) => {
//     // Clean up game and session data
//     delete games[gameId];
//     for (const sessionId in sessions) {
//       if (sessions[sessionId] === gameId) {
//         delete sessions[sessionId];
//       }
//     }
//   });

//   // Disconnect event
//   socket.on("disconnect", () => {
//     console.log("A user has disconnected");
//   });
// });

// // Helper function to generate a random game board
// function generateBoard(): string[] {
//   const symbols: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
//   const board: string[] = [];
//   for (let i = 0; i < 8; i++) {
//     const symbol: string = symbols[i];
//     board.push(symbol);
//     board.push(symbol);
//   }
//   for (let i = board.length - 1; i > 0; i--) {
//     const j: number = Math.floor(Math.random() * (i + 1));
//     [board[i], board[j]] = [board[j], board[i]];
//   }
//   return board;
// }

// // Set up server listener
// const PORT: number = parseInt(process.env.PORT || "3000", 10);
// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
