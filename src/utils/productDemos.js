import { demoBooks, demoCandles, demoServices } from "../data/productDemos.js";

export const slotMinutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
export const slotLabel = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export function availableDemoSlots(bookings, day, duration) {
  const slots = [];
  for (let start = 9 * 60; start + duration <= 18 * 60; start += 30) {
    if (!bookings.some((booking) => booking.day === day && start < booking.start + booking.minutes && start + duration > booking.start)) slots.push(slotLabel(start));
  }
  return slots;
}

export const initialBookingState = { bookings: [], nextId: 1, error: null, confirmed: null };

export function bookingReducer(state, action) {
  if (action.type === "reset") return initialBookingState;
  if (action.type === "cancel") return { ...state, bookings: state.bookings.filter((booking) => booking.id !== action.id), confirmed: null, error: null };
  if (action.type !== "reserve") return state;
  const { serviceId, day, time, name } = action;
  const service = demoServices.find((item) => item.id === serviceId);
  const cleanName = typeof name === "string" ? name.trim() : "";
  if (!service || !/^\d{4}-\d{2}-\d{2}$/.test(day || "") || !cleanName || cleanName.length > 50) return { ...state, error: "invalid", confirmed: null };
  if (!availableDemoSlots(state.bookings, day, service.minutes).includes(time)) return { ...state, error: "busy", confirmed: null };
  const booking = { id: state.nextId, name: cleanName, serviceId, day, time, start: slotMinutes(time), minutes: service.minutes, price: service.price };
  return { bookings: [...state.bookings, booking], nextId: state.nextId + 1, error: null, confirmed: booking.id };
}

export const initialReaderState = { saved: [], posts: [], nextId: 1, error: null };

export function readerReducer(state, action) {
  if (action.type === "reset") return initialReaderState;
  if (action.type === "save" && demoBooks.some((book) => book.id === action.bookId)) return { ...state, saved: state.saved.includes(action.bookId) ? state.saved.filter((id) => id !== action.bookId) : [...state.saved, action.bookId] };
  if (action.type === "like") return { ...state, posts: state.posts.map((post) => post.id === action.id ? { ...post, liked: !post.liked } : post) };
  if (action.type !== "publish") return state;
  const body = typeof action.body === "string" ? action.body.trim() : "";
  if (!demoBooks.some((book) => book.id === action.bookId) || !Number.isInteger(action.rating) || action.rating < 1 || action.rating > 5 || !body || body.length > 600) return { ...state, error: "invalid" };
  const post = { id: state.nextId, bookId: action.bookId, rating: action.rating, body, liked: false };
  return { ...state, posts: [post, ...state.posts], nextId: state.nextId + 1, error: null };
}

export function cartReducer(state, action) {
  if (action.type === "reset") return {};
  if (!demoCandles.some((item) => item.id === action.id)) return state;
  const quantity = action.type === "add" ? (state[action.id] || 0) + 1 : action.type === "quantity" ? action.quantity : null;
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) return state;
  const next = { ...state };
  if (quantity === 0) delete next[action.id];
  else next[action.id] = quantity;
  return next;
}

export function cartTotal(cart) {
  return demoCandles.reduce((total, candle) => total + candle.price * (cart[candle.id] || 0), 0);
}
