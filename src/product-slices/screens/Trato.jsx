import { BookingClient } from "../upstream/trato/BookingClient";

export default function Trato() {
  return <BookingClient barbearia={{ id: 1, nome: "Trato Barbershop · demo", endereco: "Ambiente de demonstração", max_agendamentos_cliente: 5, antecedencia_agendamento_minutos: 0 }} servicos={[
    { id: 1, nome: "Corte", preco: 45, duracao_minutos: 30 },
    { id: 2, nome: "Barba", preco: 30, duracao_minutos: 30 },
    { id: 3, nome: "Corte + barba", preco: 70, duracao_minutos: 60 },
  ]} barbeiros={[{ id: 1, nome: "Profissional A · demo", foto_url: null }, { id: 2, nome: "Profissional B · demo", foto_url: null }]} />;
}
