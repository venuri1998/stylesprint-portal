import axios from 'axios';

const STOCK_SERVICE_URL = window?.configs?.apiUrl;

export const addStock = async (stockDetails) => {
  console.log(stockDetails, 'stock details', STOCK_SERVICE_URL)
  try {
    const response = await fetch(`${STOCK_SERVICE_URL}/stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockDetails),
    });

    console.log(response, 'tis is the repsonse--')

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};