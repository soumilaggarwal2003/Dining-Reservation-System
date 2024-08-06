const db = require('../models');
const Dining = db.Dining;
const Reservation = db.Reservation;
const jwt = require('jsonwebtoken');

exports.createDiningPlace = async (req, res) => {
  try {
    const { name, address, phone_no, website, open_time, close_time } = req.body;

    const diningPlace = await Dining.create({
      name,
      address,
      phone_no,
      website,
      open_time,
      close_time
    });

    res.status(201).json({
      message: "Dining place added successfully",
      place_id: diningPlace.id,
      status_code: 201
    });
  } catch (error) {
    console.error("Error adding dining place:", error);
    res.status(500).json({ message: "Error adding dining place", status_code: 500 });
  }
};

exports.searchDiningPlaces = async (req, res) => {
  try {
    const searchQuery = req.query.name;
    const diningPlaces = await Dining.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${searchQuery}%`
        }
      }
    });

    res.status(200).json({
      results: diningPlaces
    });
  } catch (error) {
    console.error("Error searching dining places:", error);
    res.status(500).json({ message: "Error searching dining places", status_code: 500 });
  }
};

exports.getDiningPlaceAvailability = async (req, res) => {
  try {
    const { place_id, start_time, end_time } = req.query;

    const diningPlace = await Dining.findByPk(place_id);

    if (!diningPlace) {
      return res.status(404).json({ message: "Dining place not found", status_code: 404 });
    }

    const bookings = await Reservation.findAll({
      where: {
        diningId: place_id,
        start_time: {
          [db.Sequelize.Op.lte]: end_time
        },
        end_time: {
          [db.Sequelize.Op.gte]: start_time
        }
      }
    });

    let isAvailable = true;
    let nextAvailableSlot = null;

    for (const booking of bookings) {
      const bookingStart = new Date(booking.start_time);
      const bookingEnd = new Date(booking.end_time);

      const requestedStart = new Date(start_time);
      const requestedEnd = new Date(end_time);

      if (
        (requestedStart >= bookingStart && requestedStart < bookingEnd) ||
        (requestedEnd > bookingStart && requestedEnd <= bookingEnd) ||
        (requestedStart < bookingStart && requestedEnd > bookingEnd)
      ) {
        isAvailable = false;
        nextAvailableSlot = bookingEnd;
        break;
      }
    }

    res.status(200).json({
      place_id: diningPlace.id,
      name: diningPlace.name,
      phone_no: diningPlace.phone_no,
      available: isAvailable,
      next_available_slot: isAvailable ? null : nextAvailableSlot
    });
  } catch (error) {
    console.error("Error getting dining place availability:", error);
    res.status(500).json({ message: "Error getting dining place availability", status_code: 500 });
  }
};

exports.bookDiningPlace = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const { place_id, start_time, end_time } = req.body;

    const diningPlace = await Dining.findByPk(place_id);

    if (!diningPlace) {
      return res.status(404).json({ message: "Dining place not found", status_code: 404 });
    }

    const bookings = await Reservation.findAll({
      where: {
        diningId: place_id,
        start_time: {
          [db.Sequelize.Op.lte]: end_time
        },
        end_time: {
          [db.Sequelize.Op.gte]: start_time
        }
      }
    });

    let isAvailable = true;
    let nextAvailableSlot = null;

    for (const booking of bookings) {
      const bookingStart = new Date(booking.start_time);
      const bookingEnd = new Date(booking.end_time);

      const requestedStart = new Date(start_time);
      const requestedEnd = new Date(end_time);

      if (
        (requestedStart >= bookingStart && requestedStart < bookingEnd) ||
        (requestedEnd > bookingStart && requestedEnd <= bookingEnd) ||
        (requestedStart < bookingStart && requestedEnd > bookingEnd)
      ) {
        isAvailable = false;
        nextAvailableSlot = bookingEnd;
        break;
      }
    }

    if (!isAvailable) {
      return res.status(400).json({
        status: "Slot is not available at this moment, please try some other place",
        status_code: 400,
        next_available_slot: nextAvailableSlot
      });
    }

    // Create the booking
    const newBooking = await Reservation.create({
      diningId: place_id,
      userId: userId,
      start_time,
      end_time
    });

    res.status(200).json({
      status: "Slot booked successfully",
      status_code: 200,
      booking_id: newBooking.id
    });
  } catch (error) {
    console.error("Error booking the slot:", error);
    res.status(500).json({ message: "Error booking the slot", status_code: 500 });
  }
};
