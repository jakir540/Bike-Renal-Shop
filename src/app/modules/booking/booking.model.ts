import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User id Must be required'],
  },

  bikeId: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Bike',
    required: true,
  },
  startTime: { type: Date, required: true },
  returnTime: { type: String, default: null },
  totalCost: { type: Number, default: 0 },
  isReturned: { type: Boolean, default: false },
});

export const Booking = model<TBooking>('booking', bookingSchema);
