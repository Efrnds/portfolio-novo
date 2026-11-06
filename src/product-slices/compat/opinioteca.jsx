import { useEffect } from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "motion/react";
import { useSlice } from "./framework";
import { subscribeDemoEvents } from "../screens/api";

const socket = { subscribe: subscribeDemoEvents, contagemNaoLidas: 0, mensagensNaoLidasTotal: 0 };
export const useWebSocket = () => socket;
const config = { tema: "claro", corDestaque: "azul", ocultarSpoilersPadrao: false, mostrarStreak: false };
export const useConfiguracoes = () => ({ config });
export const usePlano = () => ({ modoZen: false, temPlanoTop: false, temPlanoPro: false });
export const useAuthGate = () => ({ exigirAuth: () => true });
export const useReducaoMovimentoPreferida = useReducedMotion;
export const mediaUrl = (url) => url || "";
export const encerrarSessaoCompleta = async () => {};
export const hrefLivroPesquisa = (book) => `/livros/${book.id}`;
export const keyLivroPesquisa = (book) => String(book.id);
export const useDiario = () => ({ carregando: false, sequencia: [], streak: 0, diaHoje: new Date().getDay() });
export const avatarGifPreviewUrl = (url) => url;
export const ehAvatarAnimadoParaAcessibilidade = () => false;
export const ehAvatarAnimadoPro = () => false;
export const ehAvatarGif = () => false;
export const gerarStillClient = async (url) => url;
export const podeExibirAvatarGif = () => false;
export const validarArquivoImagem = () => "Anexos estão disponíveis no produto completo.";
export const enviarImagemAnexo = async () => { throw new Error("Anexos estão disponíveis no produto completo."); };
export function Empty() { return null; }
export function ProductAction({ open, onClose }) {
  const { setNotice } = useSlice();
  useEffect(() => {
    if (!open) return;
    setNotice("Neste recorte você pode explorar o feed, votar e comentar. Para criar uma avaliação, abra a Opinioteca.");
    onClose?.();
  }, [open, onClose, setNotice]);
  return null;
}
ProductAction.propTypes = { open: PropTypes.bool, onClose: PropTypes.func };
