const express = require('express');
const cors = require('cors');

const flightRoutes = require('./routes/flight.routes');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes=require('./routes/auth.routes')
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Flight Booking API is running' });
});


app.use('/api/flights', flightRoutes);
app.use('/api/auth',authRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;