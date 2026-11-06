import Header from "../upstream/opinioteca/Header";
import Main from "../upstream/opinioteca/Main";
import Feed from "../upstream/opinioteca/Feed";
import DescobertaSecoes from "../upstream/opinioteca/DescobertaSecoes";
import { usePathname } from "../compat/framework";

export function MenuDireito() { return <DescobertaSecoes variante="lateral" />; }
export default function Opinioteca() {
  const path = usePathname();
  return <div className="flex min-h-screen flex-col bg-cinza-100 font-gabarito-regular text-azul-900">
    <Header /><Main>{path === "/explorar" ? <DescobertaSecoes /> : <Feed />}</Main>
  </div>;
}
