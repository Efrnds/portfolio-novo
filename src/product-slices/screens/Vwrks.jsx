import NavBar from "../upstream/vwrks/navBar";
import Trabalho from "../upstream/vwrks/Trabalho";
import Sobre from "../upstream/vwrks/Sobre";
import { usePathname } from "../compat/framework";
export default function Vwrks() { return <><NavBar />{usePathname() === "/sobre" ? <Sobre /> : <Trabalho />}</>; }
