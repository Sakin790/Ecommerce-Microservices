import axios from "axios";
let intervalId: any;

function startChecking(apiUrl: string) {
  intervalId = setInterval(async () => {
    try {
      const response = await axios.get(apiUrl);
      const stock = response.data.stock;

      if (stock < 10) {
        console.log(`Stock is low: ${stock}`);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }, 100);
}

function stopChecking() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Stopped stock checking.");
  }
}

startChecking("http://localhost:1000/api/v1/get-stock");
