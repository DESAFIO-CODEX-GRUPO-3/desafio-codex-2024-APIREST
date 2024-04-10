import mongoose, { Schema } from "mongoose";

const blacklistedTokenSchema : Schema = new mongoose.Schema({
    token: {
      type: String,
      required: true
    },
    expiry: {
      type: Date,
      required: true,
      index: { expires: 0 } // Configura o índice de expiração
    }
  });

const BlacklistedTokenModel = mongoose.model('BlacklistedToken', blacklistedTokenSchema );

export { BlacklistedTokenModel };