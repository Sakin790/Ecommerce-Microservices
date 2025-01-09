import { Server } from "socket.io";
import axios from "axios";
import http from "http";
import { app } from "../../app";
const server = http.createServer(app);
const io = new Server(server);

const STOCK_API_URL = "http://localhost:1000/api/v1/get-stock";

let clients: string[] = [];

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  clients.push(socket.id);

  socket.on("disconnect", () => {
    clients = clients.filter((id) => id !== socket.id);
    console.log("Client disconnected:", socket.id);
  });
});

function broadcastStockUpdate(stockData: {
  status: string;
  itemName: string;
  stockQuantity: number;
}) {
  io.emit("stock-update", stockData);
  console.log("Broadcasted stock update:", stockData);
}

async function monitorStock() {
  try {
    const response = await axios.get(STOCK_API_URL);
    const stocks = response.data;

    if (!Array.isArray(stocks)) {
      throw new Error("Invalid stock data format. Expected an array.");
    }

    stocks.forEach((item: any) => {
      if (typeof item.stock_quantity !== "number" || !item.name) {
        console.warn("Invalid stock item:", item);
        return;
      }

      if (item.stock_quantity < 10) {
        broadcastStockUpdate({
          status: "warning",
          itemName: item.name,
          stockQuantity: item.stock_quantity,
        });
      } else if (item.stock_quantity < 100) {
        broadcastStockUpdate({
          status: "alert",
          itemName: item.name,
          stockQuantity: item.stock_quantity,
        });
      }
    });
  } catch (error) {
    console.error("Error fetching stock data:", error || error);
  }
}

setInterval(monitorStock, 10000);
