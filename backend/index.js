// const app = require("express")();
// const server = require("http").Server(app);
// const io = require("socket.io")(server);

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
const PORT = 4000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Giả lập kết quả giá mới
setInterval(() => {
    const symbols = ["AAPL", "GOOG", "FB", "AMZN", "TSLA"];
    const getRandomPrice = () => +(Math.random() * 1000).toFixed(2);
    const getRandomChange = () => +(Math.random() * 10 - 5).toFixed(2);

    const newPrices = symbols.map((symbol) => ({
        symbol,
        price: getRandomPrice(),
        change: getRandomChange(),
    }));
    // Gửi danh sách giá mới cho tất cả client đang kết nối
    io.emit("newPrice", newPrices);
}, 5000);
