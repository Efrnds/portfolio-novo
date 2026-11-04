import { useMemo, useReducer, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiCheck, FiClock, FiScissors, FiX } from "react-icons/fi";
import { useLanguage } from "../../../i18n/LanguageContext";
import { demoServices } from "../../../data/productDemos";
import { availableDemoSlots, bookingReducer, initialBookingState } from "../../../utils/productDemos";
import { environmentCopy } from "./copy";
import { DemoFooter, Environment } from "./shared";

export default function TratoEnvironment() {
  const { language } = useLanguage();
  const copy = environmentCopy[language];
  const text = copy.trato;
  const reduced = useReducedMotion();
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);
  const days = useMemo(() => Array.from({ length: 4 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }), []);
  const [serviceId, setServiceId] = useState("cut");
  const [day, setDay] = useState(days[0]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const service = demoServices.find((item) => item.id === serviceId);
  const slots = availableDemoSlots(state.bookings, day, service.minutes);
  const selectedTime = slots.includes(time) ? time : "";
  const bookings = state.bookings.filter((booking) => booking.day === day).sort((a, b) => a.start - b.start);
  const formatMoney = (price) => new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en", { style: "currency", currency: "BRL" }).format(price / 100);
  const dateLabel = (value, options) => new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en", options).format(new Date(`${value}T12:00:00`));
  const reset = () => { dispatch({ type: "reset" }); setName(""); setTime(""); };

  return <Environment kind="trato" title={text.title}>
    <div className="trato-native-bar"><span className="trato-native-brand"><FiScissors aria-hidden="true" />TRATO</span><span>{text.booking}</span><span>{copy.demo}</span></div>
    <header className="product-environment__heading"><h2>{text.title}</h2><p>{text.intro}</p></header>
    <div className="trato-native-workspace">
      <form className="trato-native-booking" onSubmit={(event) => {
        event.preventDefault();
        dispatch({ type: "reserve", serviceId, day, time: selectedTime, name });
        if (selectedTime && name.trim()) setTime("");
      }}>
        <fieldset><legend>{text.service}</legend><div className="trato-native-services">
          {demoServices.map((item) => <label key={item.id} className={serviceId === item.id ? "is-selected" : ""}>
            <input type="radio" name="demo-service" value={item.id} checked={serviceId === item.id} onChange={() => { setServiceId(item.id); setTime(""); }} />
            <span><strong>{item.name[language]}</strong><small><FiClock aria-hidden="true" />{item.minutes} {text.minutes}</small></span><span>{formatMoney(item.price)}</span>
          </label>)}
        </div></fieldset>
        <fieldset><legend>{text.day}</legend><div className="trato-native-days">
          {days.map((value) => <label key={value} className={day === value ? "is-selected" : ""}>
            <input type="radio" name="demo-day" value={value} checked={day === value} onChange={() => { setDay(value); setTime(""); }} />
            <span>{dateLabel(value, { weekday: "short" })}</span><strong>{dateLabel(value, { day: "2-digit" })}</strong>
          </label>)}
        </div></fieldset>
        <fieldset><legend>{text.time}</legend><div className="trato-native-times">
          {slots.map((value) => <label key={value} className={selectedTime === value ? "is-selected" : ""}>
            <input type="radio" name="demo-time" value={value} checked={selectedTime === value} onChange={() => setTime(value)} /><span>{value}</span>
          </label>)}
          {!slots.length && <p>{text.none}</p>}
        </div></fieldset>
        <label className="trato-native-name"><span>{text.name}</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder={text.placeholder} autoComplete="off" maxLength={50} required /></label>
        <motion.button type="submit" className="trato-native-submit" disabled={!selectedTime || !name.trim()} whileTap={reduced ? undefined : { scale: 0.985 }}>{text.reserve}<FiArrowRight aria-hidden="true" /></motion.button>
        <p className="trato-native-feedback" role="status">{state.error ? text[state.error] : state.confirmed ? <><FiCheck aria-hidden="true" />{text.confirmed}</> : ""}</p>
      </form>
      <div className="trato-native-agenda">
        <div className="trato-native-agenda__heading"><FiClock aria-hidden="true" /><h3>{text.agenda}</h3><span>{String(bookings.length).padStart(2, "0")}</span></div>
        <p className="trato-native-agenda__date">{dateLabel(day, { weekday: "long", day: "numeric", month: "long" })}</p>
        <motion.ol layout className="trato-native-appointments">
          {bookings.map((booking) => <motion.li key={booking.id} layout initial={reduced ? false : { y: 18, clipPath: "inset(0 0 100% 0)" }} animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <time>{booking.time}</time><div><strong>{booking.name}</strong><span>{demoServices.find((item) => item.id === booking.serviceId).name[language]} · {booking.minutes} {text.minutes}</span></div>
            <button type="button" onClick={() => dispatch({ type: "cancel", id: booking.id })} aria-label={`${text.cancel}: ${booking.time}`}><FiX /></button>
          </motion.li>)}
        </motion.ol>
        {!bookings.length && <div className="trato-native-empty"><span aria-hidden="true">09:00 — 18:00</span><h4>{text.empty}</h4><p>{text.emptyNote}</p></div>}
        <span className="trato-native-agenda__word" aria-hidden="true">TRATO</span>
      </div>
    </div>
    <DemoFooter note={text.note} reset={reset} href="https://trato.prismapp.com.br" />
  </Environment>;
}
