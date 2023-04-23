import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
function App() {
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        // Kết nối đến server Socket.IO
        const socket = socketIOClient("http://localhost:4000");

        // Lắng nghe sự kiện "newPrice" từ server
        socket.on("newPrice", (data) => {
            // Cập nhật danh sách giá mới
            setPrices(data);
        });

        // Hủy kết nối trước khi component bị unmount để tránh leak memory
        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th>SYMBOL</th>
                        <th>PRICE</th>
                        <th>CHANGE</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((price) => (
                        <tr key={price.symbol}>
                            <td>{price.symbol}</td>
                            <td>{price.price}</td>
                            <td>{price.change}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
