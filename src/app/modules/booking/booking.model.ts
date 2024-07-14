import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  startTime: { type: String, required: true },
  returnTime: { type: String },
  totalCost: { type: Number, required: true },
  isReturned: { type: Boolean, default: false, required: true },
});

export const Booking = model<TBooking>('Model', bookingSchema);
