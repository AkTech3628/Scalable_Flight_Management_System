const Flight = require('../models/flight.models');

// Real world flight data fetch from AviationStack API and save to DB

const  redisClient=require('../config/redis')

const fetchAndSaveFlights = async () => { 
  try { 
    const apiKey = process.env.AVIATION_API_KEY; 
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&limit=20`; 
 
    const response = await fetch(url); 
    const data = await response.json(); 
    const flights = data.data || []; 
 
    const savedFlights = []; 
 
    for (const f of flights) { 
      if (!f.flight || !f.flight.iata) continue; 


      const flightData = { 
        flightNumber: f.flight.iata, 
        airline: f.airline?.name || 'Unknown', 
        departureAirport: f.departure?.airport || 'Unknown', 
        arrivalAirport: f.arrival?.airport || 'Unknown', 
        departureTime: f.departure?.scheduled || new Date(),//use beacause when api couldnot provide data 
        // then it will save current time as default value

        arrivalTime: f.arrival?.scheduled || new Date(), 
        status: f.flight_status || 'scheduled', 
        
        price: Math.floor(Math.random() * 500) + 100, 
      }; 
 
       
      const saved = await Flight.findOneAndUpdate( 
        { flightNumber: flightData.flightNumber }, 
        flightData, 
        { upsert: true, new: true } 
      ); 
 
      savedFlights.push(saved); 
    } 
 
    return savedFlights; 
  } catch (error) { 
    console.error('Error in fetching flights:', error.message); 
    throw error; 
  } 
}; 
 
const getAllFlights = async () => {

  console.time("GET_ALL_FLIGHTS");

  const cacheData = await redisClient.get("allFlights");

  if (cacheData) {
    console.log("Cache Run");
    console.timeEnd("GET_ALL_FLIGHTS");
    return JSON.parse(cacheData);
  }

  console.log("Cache Miss");

  const flights = await Flight.find().sort({
    departureTime: 1,
  });

  await redisClient.set(
    "allFlights",
    JSON.stringify(flights),
    "EX",
    60
  );

  console.timeEnd("GET_ALL_FLIGHTS");

  return flights;
};

 
const getFlightById = async (id) => { 
  return await Flight.findById(id); 
}; 
 
const createFlight = async (data) => {

  const flight = await Flight.create(data);

  await redisClient.del("allFlights");

  return flight;
};




module.exports = { 
  fetchAndSaveFlights, 
  getAllFlights, 
  getFlightById, 
  createFlight, 
  
};





