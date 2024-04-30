import axios from 'axios';

const STOCK_SERVICE_URL = window?.configs?.apiUrl;

export const addStock = async (stockDetails) => {
  try {
    const response = await axios.post(`${STOCK_SERVICE_URL}/stocks`, stockDetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.status === 200) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getStocks = async (data) => {
  try {
    const response = await axios.get(`${STOCK_SERVICE_URL}/stocks`,{
      params: {
        page: data?.page,
        limit: data?.limit,
      }
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching stock data', error);
    throw error; // Rethrowing the error so it can be caught and handled in the component
  }
};