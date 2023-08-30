const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema(
  {
    user_detail: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cartItems: {
      type: [Object],
      default: {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
    },
  }
);

CheckoutSchema.virtual("userDetail", {
  ref: "user",
  localField: "_id",
  foreignField: "user_detail",
});

CheckoutSchema.pre("find", function (next) {
  this.populate([
    { path: "user_detail", select: { __v: 0, password: 0, token: 0 } },
  ]);
  next();
});

module.exports = {
  CheckoutModel: mongoose.model("checkout", CheckoutSchema),
};
