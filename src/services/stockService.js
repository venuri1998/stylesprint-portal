import axios from 'axios';

const STOCK_SERVICE_URL = window?.configs?.apiUrl;

export const addStock = async (stockDetails) => {
  console.log(stockDetails, 'stock details', STOCK_SERVICE_URL);

  try {
    const response = await axios.post(`${STOCK_SERVICE_URL}/stocks`, stockDetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response, 'this is the response--');

    // if (!response.status === 200) {
    //   const message = `An error has occurred: ${response.status}`;
    //   throw new Error(message);
    // }

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getStocks = async (data) => {
  try {
    const response = await axios.get(`${STOCK_SERVICE_URL}/stocks`);
    console.log(response, 'this is the response--')
    return response?.data;
  } catch (error) {
    console.error('Error fetching stock data', error);
    throw error; // Rethrowing the error so it can be caught and handled in the component
  }
};