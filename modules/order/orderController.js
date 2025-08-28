import FoodModel from "../foods/foodModel.js";
import OrderModel from "./orderModel.js";

//place order
const placeOrder = async (req, res) => {
  try {
    const { foods, payment, buyer } = req.body;

    // Validate
    if (!foods || foods.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one food item is required" });
    }
    if (!buyer) {
      return res.status(400).json({ message: "Buyer is required" });
    }
    if (!payment || !payment.method) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of foods) {
      const foodData = await FoodModel.findById(item.food);
      if (!foodData) {
        return res
          .status(404)
          .json({ message: `Food not found: ${item.food}` });
      }
      totalAmount += foodData.price * (item.quantity || 1);
    }

    // Save order with quantities
    const order = await OrderModel.create({
      foods: foods.map((f) => ({
        food: f.food,
        quantity: f.quantity || 1,
      })),
      payment: {
        ...payment,
        amount: totalAmount,
      },
      buyer,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

//Update order status
const orderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "preparing",
      "prepare",
      "prepared",
      "on the way",
      "delivered",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed: " + validStatuses.join(", "),
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating order status API",
      error: error.message,
    });
  }
};

export { placeOrder, orderStatus };
