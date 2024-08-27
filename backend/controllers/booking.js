import Booking from "../models/booking.js"
import Order from "../models/order.js"
import moment from 'moment';

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('client').populate('rooms.room').populate('orders').populate('orders.order.food').sort({ createdAt: -1 })
        res.status(200).json(bookings)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const addBooking = async (req, res) => {
    const {client, rooms, bookingPrice, joiningDate, leavingDate} = req.body
    let invoice_no = ''
    let order_ids = []
    try {
        const orders = await Order.find({client})
       if (orders) {
        order_ids = orders.map((o) => {
            return o._id
        })
       }
        const latestBooking = await Booking.findOne({}).sort({ createdAt: -1})
        if (latestBooking) {
            invoice_no = (latestBooking.invoice_no+1)
        } else {
            invoice_no = 1
        }
        const booking = await Booking.create({
            client, 
            rooms,
            orders: order_ids,
            bookingPrice,
            joiningDate,
            leavingDate,
            invoice_no
        })
        res.status(200).json(booking)
    } catch (error) {
       res.status(500).json("Could add the data") 
    }
}

export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({_id:req.params.id})
        .populate('client')  // Populate the client field
    .populate('rooms') 
     .populate('rooms.room')
    .populate({
        path: 'orders',   // Populate orders array
        populate: {
            path: 'order.food',  // Populate food inside each order
            model: 'Food'        // Ensure Food model is referenced
        }
    });
        res.status(200).json(booking)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

// Helper function to get month names
const getMonthLabels = () => {
    return moment.months();
  };
  
  // Calculate monthly revenue
  export const getMonthlyRevenue = async (req, res) => {
    try {
      // Initialize an array to store monthly revenue
      const monthlyRevenue = new Array(12).fill(0);
  
      // Get the current year
      const currentYear = moment().year();
  
      // Find all bookings within the current year
      const bookings = await Booking.find({
        joiningDate: {
          $gte: moment().startOf('year').toDate(),
          $lte: moment().endOf('year').toDate(),
        },
      }).populate("orders");
  
      // Loop through the bookings and calculate revenue for each month
      bookings.forEach((booking) => {
        const bookingMonth = moment(booking.joiningDate).month(); // Get the booking month (0-11)
        monthlyRevenue[bookingMonth] += booking.bookingPrice || 0; // Add booking totalPrice to the respective month
        booking.orders.forEach(o => {
            monthlyRevenue[bookingMonth] += o.totalPrice
        })
      });
  
      // Prepare the response with labels and data
      const labels = getMonthLabels();
      const data = monthlyRevenue;
      console.log(data)
      res.status(200).json({ labels, data });
    } catch (error) {
      console.error("Error fetching monthly revenue", error);
      res.status(500).json("Could not retrieve monthly revenue");
    }
  };

export const getProfit = async (req, res) => {
    try {
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

        const bookings = await Booking.find({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        }).populate('orders'); 
        let totalProfit = 0;

        bookings.forEach(booking => {
            totalProfit += booking.bookingPrice;

            booking.orders.forEach(order => {
                totalProfit += order.totalPrice; 
            });
        });

        res.status(200).json({ profit: totalProfit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not calculate profit", error });
    }
};

export const deleteBooking = async (req, res) => {

    try {
        const booking = await Booking.findByIdAndDelete(req.params.id)
        res.status(200).json(booking)
    } catch (error) {
       res.status(500).json("Could not delete the data") 
    }
}

export const paid = async (req, res) => {
    try {
        const booking = await Booking.findOne({_id: req.params.id})
        if (!booking) res.status(404).json("Booking not found") 
            booking.paid = true
            booking.paidAt = new Date().toLocaleDateString()
            await booking.save()
        res.status(200).json(booking)
    } catch (error) {
       res.status(500).json("Could not Update booking") 
    }
}

// export const updateOrder = async (req, res) => {
//     const {name, price} = req.body

//     try {
//         const food = await Booking.findOne({_id:req.params.id})
//         if (!food) res.status(404).json("Food not found") 
//             Booking.name = name
//             Booking.price = price
//             await Booking.save()
//         res.status(200).json(food)
//     } catch (error) {
//        res.status(500).json("Could not Update Food") 
//     }
// }