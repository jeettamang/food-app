import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Restaurant title is required"] },
    imageUrl: { type: String },
    logoUrl: { type: String },
    foods: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
      },
    ],
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    pickUp: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    ratingCount: { type: Number, default: 0 },
    code: { type: String },
    coords: {
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
export default RestaurantModel;
