import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Container, Alert } from 'react-bootstrap';

function UserDashboard() {
  const [stocks, setStocks] = useState([]); // List of stock holdings
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState(null);

  // Load stocks from LocalStorage
  useEffect(() => {
    const savedStocks = JSON.parse(localStorage.getItem('stocks')) || [];
    setStocks(savedStocks);
    calculateTotalValue(savedStocks);
  }, []);

  // Save stocks to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
    calculateTotalValue(stocks);
  }, [stocks]);

  const fetchStockPrices = async () => {
    return {
      AAPL: 150, // Example price for Apple stock
      TSLA: 200, // Example price for Tesla stock
    };
  };

  const calculateTotalValue = async (stocks) => {
    const prices = await fetchStockPrices();
    let total = 0;
    stocks.forEach(stock => {
      const price = prices[stock.ticker] || 0;
      total += stock.quantity * price;
    });
    setTotalValue(total);
  };

  const handleAddStock = () => {
    if (!name || !ticker || !quantity || !buyPrice || quantity <= 0 || buyPrice <= 0) {
      setError('Please fill in all fields correctly.');
      return;
    }

    const newStock = { name, ticker, quantity: parseInt(quantity), buyPrice: parseFloat(buyPrice) };
    setStocks([...stocks, newStock]);
    setName('');
    setTicker('');
    setQuantity('');
    setBuyPrice('');
    setError(null);
  };

  const handleDeleteStock = (index) => {
    const updatedStocks = stocks.filter((_, i) => i !== index);
    setStocks(updatedStocks);
  };

  return (
    <Container>
      <h1>User Dashboard</h1>
      <div>
        <h2>Total Portfolio Value: ${totalValue.toFixed(2)}</h2>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="formStockName">
          <Form.Label>Stock Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter stock name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStockTicker">
          <Form.Label>Stock Ticker</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter stock ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStockQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStockBuyPrice">
          <Form.Label>Buy Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter buy price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddStock}>Add Stock</Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.ticker}</td>
              <td>{stock.quantity}</td>
              <td>${stock.buyPrice}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteStock(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserDashboard;
