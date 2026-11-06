import React from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "motion/react";
import { Image } from "./framework";
import { Scissors } from "lucide-react";

export const gerarSlugAgendamentoBarbearia = (shop) => shop ? `${shop.id}-trato-barbershop` : null;
export const googleLoginHabilitado = () => false;
export function useIsMobile() { return false; }
export function SidebarProvider({ children }) { return <>{children}</>; }
export function ClientMobileShell({ children }) { return <div data-slice-trato-shell className="bg-background text-foreground py-8 sm:px-6">{children}</div>; }
export function MobileLayout() { return null; }
export function AppSidebar() { return null; }
export function ClienteCredenciaisFluxo() { return null; }
export function CatalogoFoto({ src, alt, fill }) { return src ? <Image src={src} alt={alt} fill={fill} /> : <div className="flex size-full items-center justify-center bg-muted"><Scissors className="size-12 text-muted-foreground" /></div>; }
export function Calendar({ selected, onSelect, disabled, className }) {
  const reduced = useReducedMotion();
  const [month, setMonth] = React.useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return <div data-slice-calendar className={`p-3 ${className ?? ""}`} style={{ transition: reduced ? "none" : "height 220ms ease" }}><div className="w-full min-w-0">
    <div className="mb-4 flex items-center justify-between"><button type="button" aria-label="Mês anterior" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button><strong>{month.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</strong><button type="button" aria-label="Próximo mês" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button></div>
    <div className="grid grid-cols-7 gap-1">{["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => <span key={i} className="text-center text-xs text-muted-foreground">{day}</span>)}{Array.from({ length: month.getDay() }, (_, i) => <span key={`blank${i}`} />)}{Array.from({ length: days }, (_, i) => {
      const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
      const isSelected = selected?.toDateString() === date.toDateString();
      const before = disabled?.before ? new Date(disabled.before.getFullYear(), disabled.before.getMonth(), disabled.before.getDate()) : null;
      const unavailable = typeof disabled === "function" ? disabled(date) : before ? date < before : false;
      return <button key={i} type="button" aria-label={date.toLocaleDateString("pt-BR")} disabled={unavailable} aria-pressed={isSelected} onClick={() => onSelect(new Date(Date.UTC(month.getFullYear(), month.getMonth(), i + 1)))} style={{ width: "100%", height: 36 }} className={`rounded-md text-sm disabled:opacity-30 ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{i + 1}</button>;
    })}</div>
  </div></div>;
}
SidebarProvider.propTypes = { children: PropTypes.node };
ClientMobileShell.propTypes = { children: PropTypes.node };
CatalogoFoto.propTypes = { src: PropTypes.string, alt: PropTypes.string, fill: PropTypes.bool };
Calendar.propTypes = { selected: PropTypes.instanceOf(Date), onSelect: PropTypes.func.isRequired, disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.array, PropTypes.object]), className: PropTypes.string };
