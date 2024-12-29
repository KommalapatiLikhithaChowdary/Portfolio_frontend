import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [portfolio, setPortfolio] = useState({
    totalValue: 100000, // Total portfolio value
    stocks: [
      { name: 'AAPL', value: 50000, purchasePrice: 120, currentPrice: 150, quantity: 100 },
      { name: 'GOOG', value: 30000, purchasePrice: 2000, currentPrice: 2200, quantity: 10 },
      { name: 'TSLA', value: 20000, purchasePrice: 700, currentPrice: 800, quantity: 25 },
    ],
  });

  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [100000, 105000, 110000, 115000, 120000],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Simulate fetching portfolio data from API and updating chart
    setTimeout(() => {
      setPortfolio(prevPortfolio => ({
        ...prevPortfolio,
        totalValue: prevPortfolio.stocks.reduce((acc, stock) => acc + stock.value, 0),
      }));
    }, 1000);
  }, [portfolio.stocks]);

  const calculatePerformance = (stock) => {
    const roi = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
    return roi.toFixed(2);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Total Portfolio Value</Card.Title>
              <Card.Text>${portfolio.totalValue.toFixed(2)}</Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Portfolio Performance</Card.Title>
              <Line data={chartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Investment Breakdown</Card.Title>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Current Value</th>
                    <th>Purchase Price</th>
                    <th>Quantity</th>
                    <th>ROI (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.stocks.map((stock, index) => (
                    <tr key={index}>
                      <td>{stock.name}</td>
                      <td>${(stock.currentPrice * stock.quantity).toFixed(2)}</td>
                      <td>${stock.purchasePrice}</td>
                      <td>{stock.quantity}</td>
                      <td>{calculatePerformance(stock)}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
