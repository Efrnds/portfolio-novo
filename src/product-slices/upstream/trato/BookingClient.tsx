"use client";

import { gerarSlugAgendamentoBarbearia } from "@/lib/agendamento-slug";
import { googleLoginHabilitado } from "@/lib/google-login-enabled";

import { useState } from "react";
import {
  Clock,
  Scissors,
  Crown,
  MapPin,
  ArrowLeft,
  Loader2,
  User,
  Phone,
  CheckCircle2,
  Search,
  ChevronsUpDown,
  Check,
  Ban,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientMobileShell } from "@/app/cliente/_components/client-mobile-shell";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClienteCredenciaisFluxo } from "@/components/cliente-credenciais-fluxo";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CatalogoFoto } from "@/components/catalogo-foto";

interface Servico {
  id: number;
  nome: string;
  preco: number;
  duracao_minutos: number | null;
  fotos?: string[];
  foto_url?: string | null;
}

interface Barbearia {
  id: number;
  nome: string;
  endereco: string | null;
  logo_url?: string | null;
  antecedencia_agendamento_minutos?: number;
  max_agendamentos_cliente?: number;
  google_login_enabled?: boolean;
}

interface ClienteAdmin {
  id: number;
  nome: string;
  telefone?: string | null;
  ativo?: boolean;
}

interface BeneficioServico {
  valorFinal: number;
  gratis: boolean;
  descontoPct: number;
}

const MAX_QTD_MESMO_SERVICO = 10;

function contarServicos(ids: number[]): Map<number, number> {
  const mapa = new Map<number, number>();
  for (const id of ids) {
    mapa.set(id, (mapa.get(id) ?? 0) + 1);
  }
  return mapa;
}

function formatarServicosSelecionados(
  ids: number[],
  servicos: Servico[],
): string {
  return [...contarServicos(ids).entries()]
    .map(([id, qtd]) => {
      const nome = servicos.find((s) => s.id === id)?.nome;
      if (!nome) return null;
      return qtd > 1 ? `${qtd}x ${nome}` : nome;
    })
    .filter(Boolean)
    .join(", ");
}

function BookingWrapper({
  isAdmin,
  isLoggedClient,
  children,
}: {
  isAdmin: boolean;
  isLoggedClient: boolean;
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isAdmin) {
    // No mobile: layout simples sem sidebar (isMobile=true ou undefined durante hidratação)
    if (isMobile !== false) {
      return (
        <main className="w-full bg-background relative selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col items-center justify-start">
          <MobileLayout />
          <div className="w-full max-w-2xl px-2 pb-28">{children}</div>
        </main>
      );
    }
    // No desktop: layout com sidebar
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-background relative selection:bg-primary selection:text-primary-foreground min-h-screen pb-8 flex justify-center items-start">
          <MobileLayout />
          <div className="w-full max-w-2xl px-2 pt-10">{children}</div>
        </main>
      </SidebarProvider>
    );
  }

  if (isLoggedClient) {
    return (
      <ClientMobileShell>
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          {children}
        </div>
      </ClientMobileShell>
    );
  }

  // Visitante não logado
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-8">
        {children}
      </div>
    </div>
  );
}

export function BookingClient({
  barbearia,
  servicos,
  barbeiros,
}: {
  barbearia: Barbearia;
  servicos: Servico[];
  barbeiros: { id: number; nome: string; foto_url: string | null }[];
}) {
  const { data: session, status } = useSession();
  const barbeariaPath =
    gerarSlugAgendamentoBarbearia(barbearia) ?? String(barbearia.id);
  const callbackAgendamento = `/agendar/${barbeariaPath}`;
  const [mostrarCredenciais, setMostrarCredenciais] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 5 = Sucesso
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  function quantidadeServico(servicoId: number) {
    return selectedServices.filter((id) => id === servicoId).length;
  }

  function adicionarServico(servicoId: number) {
    setSelectedServices((prev) => {
      const atual = prev.filter((id) => id === servicoId).length;
      if (atual >= MAX_QTD_MESMO_SERVICO) return prev;
      return [...prev, servicoId];
    });
  }

  function removerServico(servicoId: number) {
    setSelectedServices((prev) => {
      const idx = prev.indexOf(servicoId);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }

  const totalServicosSelecionados = selectedServices.length;
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<number | null>(null);

  // Refatorado para lidar com UI da imagem 1:
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [clienteNome, setClienteNome] = useState("");
  const [clienteTel, setClienteTel] = useState("");
  const [clienteId, setClienteId] = useState<string>("NOVO");

  const [clientesAdmin, setClientesAdmin] = useState<ClienteAdmin[]>([]);
  const [clientePopoverAberto, setClientePopoverAberto] = useState(false);
  const [buscaCliente, setBuscaCliente] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [agendamentosAtivos, setAgendamentosAtivos] = useState<any[]>([]);
  const [loadingAgendamentos, setLoadingAgendamentos] = useState(false);
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);
  const [googleEnabled, setGoogleEnabled] = useState(() => {
    return googleLoginHabilitado(barbearia.google_login_enabled);
  });

  const [beneficiosServicos, setBeneficiosServicos] = useState<
    Record<number, BeneficioServico>
  >({});
  const antecedenciaMinutos = Math.max(
    0,
    Number(barbearia.antecedencia_agendamento_minutos ?? 60),
  );

  const isAdmin = ["gerente", "gestor", "funcionario"].includes(
    session?.user?.role as string,
  );
  const isLoggedClient = session?.user && !isAdmin;

  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const truncated = cleanValue.slice(0, 11);
    if (truncated.length === 0) return "";
    let formatted = "(" + truncated.substring(0, 2);
    if (truncated.length > 2) formatted += ") " + truncated.substring(2, 7);
    if (truncated.length > 7) formatted += "-" + truncated.substring(7, 11);
    return formatted;
  };

  // Persiste barbearia no localStorage para o shell de navegação do cliente
  useEffect(() => {
    if (!isLoggedClient) return;
    try {
      localStorage.setItem(
        "cliente_ultima_barbearia",
        JSON.stringify({ id: barbearia.id, nome: barbearia.nome }),
      );
    } catch {}
  }, [isLoggedClient, barbearia.id, barbearia.nome]);

  // Gerar slots dinamicamente
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [mensagemFolgaDia, setMensagemFolgaDia] = useState<string | null>(null);
  const [barbeariaFolga, setBarbeariaFolga] = useState(false);

  // Buscar clientes caso seja admin acessando a tela de agendamento public
  useEffect(() => {
    if (isAdmin) {
      fetch("/api/clientes")
        .then((r) => r.json())
        .then((d) => {
          if (d.success) setClientesAdmin(d.clientes);
        })
        .catch(() => {});
    }

    if (session?.user?.role === "funcionario" && session.user?.id) {
      setSelectedBarbeiro(Number(session.user.id));
    }

    if (isLoggedClient && session?.user?.nome) {
      setClienteNome(session.user.nome);
      // Se o telefone estivesse na sessão setava também
    }
  }, [isAdmin, isLoggedClient, session]);

  const fetchAgendamentosAtivos = () => {
    if (!isLoggedClient) return;
    setLoadingAgendamentos(true);
    fetch("/api/cliente/agendamentos")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const ativos = d.agendamentos.filter((a: any) => 
            (a.status === "pendente" || a.status === "confirmado") && 
            a.barbeiro?.barbearia?.id === barbearia.id
          );
          setAgendamentosAtivos(ativos);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingAgendamentos(false));
  };

  useEffect(() => {
    fetchAgendamentosAtivos();
  }, [isLoggedClient, barbearia.id]);

  const limiteAtingido = !!(
    (barbearia.max_agendamentos_cliente ?? 0) > 0 && 
    agendamentosAtivos.length >= (barbearia.max_agendamentos_cliente ?? 0) &&
    isLoggedClient &&
    !loadingAgendamentos &&
    step !== 5
  );

  async function handleCancelarAgendamento(id: number) {
    setCancelandoId(id);
    try {
      const res = await fetch(`/api/cliente/agendamentos/${id}/cancelar`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Agendamento cancelado com sucesso.");
        fetchAgendamentosAtivos();
      } else {
        toast.error(data.message ?? "Erro ao cancelar.");
      }
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setCancelandoId(null);
    }
  }

  // Duração total dos serviços selecionados
  const duracaoTotal = useMemo(() => {
    return selectedServices.reduce((acc, id) => {
      const s = servicos.find((s) => s.id === id);
      return acc + (s?.duracao_minutos || 30);
    }, 0);
  }, [selectedServices, servicos]);

  // Preço total dos serviços selecionados
  const precoTotal = useMemo(() => {
    return selectedServices.reduce((acc, id) => {
      const s = servicos.find((s) => s.id === id);
      return acc + (s?.preco || 0);
    }, 0);
  }, [selectedServices, servicos]);

  const precoTotalComBeneficio = useMemo(() => {
    return selectedServices.reduce((acc, id) => {
      const servico = servicos.find((s) => s.id === id);
      if (!servico) return acc;
      const beneficio = beneficiosServicos[id];
      return acc + Number(beneficio?.valorFinal ?? servico.preco ?? 0);
    }, 0);
  }, [selectedServices, servicos, beneficiosServicos]);

  useEffect(() => {
    async function carregarBeneficiosCliente() {
      if (!servicos.length) {
        setBeneficiosServicos({});
        return;
      }

      const clienteIdAdmin =
        isAdmin && clienteId !== "NOVO" ? Number(clienteId) : null;

      if (!isLoggedClient && !clienteIdAdmin) {
        setBeneficiosServicos({});
        return;
      }

      try {
        const mapa: Record<number, BeneficioServico> = {};

        if (clienteIdAdmin) {
          const itensPreview = servicos.map((s) => ({
            servico_id: s.id,
            produto_id: null,
            quantidade: 1,
            valor_unitario: Number(s.preco),
            valor_original: Number(s.preco),
          }));

          const res = await fetch("/api/financeiro/faturas/preview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cliente_id: clienteIdAdmin,
              itens: itensPreview,
            }),
          });
          const data = await res.json();

          if (data.success && Array.isArray(data.itens)) {
            for (const item of data.itens as any[]) {
              const idServico = item.servico_id
                ? Number(item.servico_id)
                : null;
              if (!idServico) continue;
              const original = Number(
                item.valor_original ?? item.valor_unitario ?? 0,
              );
              const valorFinal = Number(item.valor_unitario ?? original);
              const descontoPct =
                original > 0
                  ? Math.max(
                      0,
                      Math.min(100, ((original - valorFinal) / original) * 100),
                    )
                  : 0;

              if (valorFinal === original) continue;

              mapa[idServico] = {
                valorFinal,
                gratis: valorFinal <= 0.0001,
                descontoPct,
              };
            }
          }

          setBeneficiosServicos(mapa);
          return;
        }

        const res = await fetch("/api/cliente/assinaturas", {
          cache: "no-store",
        });
        const data = await res.json();

        if (!data.success || !Array.isArray(data.assinaturas)) {
          setBeneficiosServicos({});
          return;
        }

        const assinaturaAtiva =
          data.assinaturas.find(
            (a: any) => a.ativa && Number(a.barbearia?.id) === barbearia.id,
          ) ?? data.assinaturas.find((a: any) => a.ativa);

        if (!assinaturaAtiva?.itens || !Array.isArray(assinaturaAtiva.itens)) {
          setBeneficiosServicos({});
          return;
        }

        for (const item of assinaturaAtiva.itens as any[]) {
          if (item.tipo_item !== "servico" || !item.servico_id) continue;

          const servico = servicos.find(
            (s) => s.id === Number(item.servico_id),
          );
          if (!servico) continue;

          const precoBase = Number(servico.preco ?? 0);
          const descontoPct = Number(item.desconto_pct ?? 0);
          const temSaldoGratis =
            item.gratis && (item.restante == null || Number(item.restante) > 0);

          let valorFinal = precoBase;
          if (temSaldoGratis) {
            valorFinal = 0;
          } else if (descontoPct > 0) {
            valorFinal = precoBase * (1 - descontoPct / 100);
          }

          if (valorFinal === precoBase) continue;

          mapa[Number(item.servico_id)] = {
            valorFinal,
            gratis: valorFinal <= 0.0001,
            descontoPct,
          };
        }

        setBeneficiosServicos(mapa);
      } catch {
        setBeneficiosServicos({});
      }
    }

    carregarBeneficiosCliente();
  }, [isLoggedClient, isAdmin, clienteId, barbearia.id, servicos]);

  // Trigger para forçar atualização via WebSocket/SSE
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Escutar eventos em tempo real (atualiza horários disponíveis)
  useEffect(() => {
    if (!barbearia.id) return;
    const sse = new EventSource(
      `/api/agendar/stream?barbearia_id=${barbearia.id}`,
    );

    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.barbearia_id === barbearia.id) {
          setRefreshTrigger((prev) => prev + 1);
        }
      } catch {
        // ignora mensagens inválidas
      }
    };

    return () => {
      sse.close();
    };
  }, [barbearia.id]);

  // Buscar Horários Dinâmicos
  useEffect(() => {
    if (
      step === 3 &&
      selectedBarbeiro &&
      selectedDate &&
      selectedServices.length > 0
    ) {
      const fetchHorarios = async () => {
        setLoadingHorarios(true);
        setSelectedTime(null);
        try {
          const dtStr = format(selectedDate, "yyyy-MM-dd");

          const res = await fetch(
            `/api/agendar/horarios?barbeiro_id=${selectedBarbeiro}&data=${dtStr}&duracao_minutos=${duracaoTotal}`,
          );
          const data = await res.json();
          if (data.success) {
            setAvailableTimes(data.horarios || []);
            setMensagemFolgaDia(data.mensagemFolga || null);
            setBarbeariaFolga(!!data.barbeariaFolga);
          } else {
            setAvailableTimes([]);
            setMensagemFolgaDia(null);
            setBarbeariaFolga(false);
          }
        } catch {
          setAvailableTimes([]);
          setMensagemFolgaDia(null);
          setBarbeariaFolga(false);
        } finally {
          setLoadingHorarios(false);
        }
      };

      fetchHorarios();
    }
  }, [
    step,
    selectedBarbeiro,
    selectedDate,
    selectedServices,
    duracaoTotal,
    refreshTrigger,
  ]);

  async function handleAgendar() {
    setErro(null);
    if (selectedServices.length === 0) {
      setErro("Selecione ao menos um serviço.");
      return;
    }
    if (!selectedDate || !selectedTime) {
      setErro("Selecione a data e o horário do serviço.");
      return;
    }

    if (!isLoggedClient && clienteId === "NOVO" && !clienteNome) {
      setErro("Preencha o nome do cliente.");
      return;
    }

    // Criar payload de data/hora sempre no fuso de Brasília
    const dtStr = format(selectedDate, "yyyy-MM-dd");
    const isoDate = `${dtStr}T${selectedTime}:00.000-03:00`;

    setLoading(true);
    try {
      const res = await fetch("/api/agendar/publico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barbearia_id: barbearia.id,
          barbeiro_id: selectedBarbeiro,
          servico_ids: selectedServices,
          produto_id: null,
          data_hora: isoDate,
          cliente_nome: clienteId === "NOVO" ? clienteNome : null,
          cliente_telefone: clienteId === "NOVO" ? clienteTel : null,
          admin_forced_client_id:
            clienteId === "NOVO" ? null : Number(clienteId),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErro(data.message || "Erro ao agendar.");
        return;
      }
      fetchAgendamentosAtivos();
      setRefreshTrigger((prev) => prev + 1);
      setStep(5);
    } catch {
      setErro("Houve um problema de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const showMobileStickyActions = step !== 5;
  /** Mobile: dock centrado; logado fica logo acima da pill (bottom-6 + altura ~4rem + folga). Desktop: rodapé full width. */
  const stickyBarPositionClass = (isLoggedClient || isAdmin)
    ? "top-auto max-md:bottom-[calc(1.5rem+4rem+0.5rem+env(safe-area-inset-bottom,0px))] md:bottom-0"
    : "top-auto max-md:bottom-0 md:bottom-0";
  const stickyActionLabel =
    step === 1
      ? "Continuar"
      : step === 2
        ? "Continuar"
        : step === 3
          ? isLoggedClient
            ? loading
              ? "Confirmando..."
              : "Confirmar Agendamento"
            : "Avançar"
          : loading
            ? "Confirmando..."
            : "Confirmar e Agendar";

  const stickyActionDisabled =
    step === 1
      ? selectedServices.length === 0
      : step === 2
        ? !selectedBarbeiro
        : step === 3
          ? !selectedDate || !selectedTime || loading
          : loading;

  const handleStickyAction = () => {
    if (step === 1) {
      if (session?.user?.role === "funcionario") {
        setStep(3);
      } else {
        setStep(2);
      }
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      if (isLoggedClient) {
        handleAgendar();
      } else {
        setStep(4);
      }
      return;
    }

    handleAgendar();
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md bg-card border border-border/50 text-card-foreground p-8 sm:p-10 font-sans flex flex-col items-center text-center relative rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20 overflow-hidden">
            {barbearia.logo_url ? (
              <img
                src={barbearia.logo_url}
                alt={barbearia.nome}
                className="size-full object-cover"
              />
            ) : (
              <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2">{barbearia.nome}</h1>
          <p className="text-muted-foreground mb-8">
            Para garantir a segurança dos seus agendamentos, faça login{" "}
            {googleEnabled
              ? "com Google ou informe seu WhatsApp"
              : "informando seu WhatsApp"}
            . É rápido!
          </p>

          <AnimatePresence mode="wait">
            {mostrarCredenciais ? (
              <motion.div
                key="credenciais"
                initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(3px)" }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <ClienteCredenciaisFluxo
                  variant="login"
                  incluirCadastro={!googleEnabled}
                  barbeariaId={barbearia.id}
                  successRedirectTo={callbackAgendamento}
                  onVoltarOpcoes={() => setMostrarCredenciais(false)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="opcoes"
                initial={{ opacity: 0, x: -20, filter: "blur(3px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col"
              >
          {googleEnabled && (
            <Button
              className="w-full rounded-full h-14 text-lg font-bold shadow-lg bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-3 transition-all cursor-pointer"
              onClick={() => {
                const callbackUrl =
                  typeof window !== "undefined"
                    ? `${window.location.origin}${callbackAgendamento}`
                    : callbackAgendamento;

                if (typeof window !== "undefined") {
                  window.sessionStorage.setItem(
                    "trato_auth_callback_url",
                    callbackAgendamento,
                  );
                }

                signIn("google", {
                  callbackUrl,
                });
              }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Entrar com Google
            </Button>
          )}

          <Button
            className={googleEnabled ? "mt-3 w-full rounded-full h-14 text-lg font-bold shadow-lg bg-card text-foreground border border-border hover:bg-accent hover:text-white flex items-center justify-center gap-3 transition-all cursor-pointer" : "w-full rounded-full h-14 text-lg font-bold shadow-lg bg-card text-foreground border border-border hover:bg-accent hover:text-white flex items-center justify-center gap-3 transition-all cursor-pointer"}
            onClick={() => {
              setMostrarCredenciais(true);
            }}
          >
            <User className="w-6 h-6 shrink-0" />
            Entrar com telefone e senha
          </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <BookingWrapper isAdmin={isAdmin} isLoggedClient={!!isLoggedClient}>
      <div
        className={`w-full max-w-2xl mx-auto text-card-foreground font-sans flex flex-col relative sm:max-h-[90vh] sm:overflow-y-auto overflow-x-hidden scrollbar-thin ${step !== 5 ? `sm:bg-card sm:border sm:border-border/50 p-4 sm:p-8 md:p-10 sm:rounded-3xl sm:shadow-2xl ${showMobileStickyActions ? (isLoggedClient ? "max-md:pb-44" : "max-md:pb-36") : "max-md:pb-8"} md:pb-44 lg:pb-48` : ""}`}
      >
        {/* Saloon Header Info - Oculta no sucesso */}
        {step !== 5 && (
          <div className="text-center mb-8 pt-4 relative">
            {step > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
                onClick={() => {
                  if (step === 3 && session?.user?.role === "funcionario") {
                    setStep(1);
                  } else {
                    const prevStep: Record<
                      1 | 2 | 3 | 4 | 5,
                      1 | 2 | 3 | 4 | 5
                    > = {
                      1: 1,
                      2: 1,
                      3: 2,
                      4: 3,
                      5: 4,
                    };
                    setStep((s) => prevStep[s]);
                  }
                }}
              >
                <ArrowLeft className="size-5" />
              </Button>
            )}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20 overflow-hidden">
              {barbearia.logo_url ? (
                <img
                  src={barbearia.logo_url}
                  alt={barbearia.nome}
                  className="size-full object-cover"
                />
              ) : (
                <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">
              {barbearia.nome}
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span>{barbearia.endereco || "Endereço não cadastrado"}</span>
            </div>

            {isAdmin && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Link href="/dashboard">Voltar ao Sistema</Link>
              </Button>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 mx-1">
                1. Escolha os serviços
              </h2>
              <p className="text-sm text-muted-foreground mb-4 mx-1">
                Precisa do mesmo serviço para mais de uma pessoa? Use o + para
                adicionar a quantidade.
              </p>
              {servicos.length === 0 ? (
                <p className="text-muted-foreground text-center py-8 mb-4">
                  Nenhum serviço disponível no momento.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {servicos.map((service) => {
                    const quantidade = quantidadeServico(service.id);
                    const isSelected = quantidade > 0;
                    const beneficio = beneficiosServicos[service.id];
                    return (
                      <Card
                        key={service.id}
                        className={`transition-[border-color,box-shadow,background-color] overflow-hidden py-0 gap-0 shadow-none flex flex-col rounded-xl border-2 ${
                          isSelected
                            ? "bg-primary/10 border-primary shadow-md shadow-primary/20"
                            : "bg-card border-border/80 hover:border-muted-foreground/35"
                        }`}
                      >
                        <CardContent className="p-0 flex flex-col h-full">
                          <div
                            className={`relative aspect-square w-full overflow-hidden bg-muted ${
                              isSelected
                                ? "ring-1 ring-inset ring-primary/50"
                                : ""
                            }`}
                          >
                            <CatalogoFoto
                              src={service.foto_url}
                              fotos={service.fotos}
                              alt={service.nome}
                              fallback="servico"
                              fill
                            />
                          </div>

                          <div className="flex flex-col gap-2 flex-1 min-w-0 p-2.5 sm:p-3">
                            <div className="min-w-0">
                              <h3 className="font-bold text-foreground text-xs sm:text-sm leading-snug line-clamp-2 inline-flex items-start gap-1">
                                {beneficio && (
                                  <Crown className="size-3 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                                )}
                                <span>{service.nome}</span>
                              </h3>
                              <div className="flex flex-col gap-0.5 mt-1 text-[11px] sm:text-xs text-muted-foreground">
                                {service.duracao_minutos && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="size-3 shrink-0" />
                                    {service.duracao_minutos} min
                                  </span>
                                )}
                                {beneficio?.gratis ? (
                                  <span className="font-semibold text-emerald-500 uppercase tracking-wide text-xs">
                                    Grátis
                                  </span>
                                ) : beneficio ? (
                                  <span className="font-semibold text-primary text-xs sm:text-sm">
                                    {new Intl.NumberFormat("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    }).format(beneficio.valorFinal)}
                                    <span className="ml-1 text-[10px] sm:text-xs text-muted-foreground line-through font-normal">
                                      {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      }).format(service.preco)}
                                    </span>
                                  </span>
                                ) : (
                                  <span className="font-semibold text-primary text-xs sm:text-sm">
                                    {new Intl.NumberFormat("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    }).format(service.preco)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-auto flex items-center justify-center gap-1 pt-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="size-8 shrink-0"
                                disabled={quantidade === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removerServico(service.id);
                                }}
                                aria-label={`Remover um ${service.nome}`}
                              >
                                <Minus className="size-3.5" />
                              </Button>
                              <span className="min-w-5 text-center text-sm font-semibold tabular-nums">
                                {quantidade}
                              </span>
                              <Button
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                size="icon"
                                className="size-8 shrink-0"
                                disabled={quantidade >= MAX_QTD_MESMO_SERVICO}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  adicionarServico(service.id);
                                }}
                                aria-label={`Adicionar um ${service.nome}`}
                              >
                                <Plus className="size-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Resumo dos serviços selecionados */}
              {totalServicosSelecionados > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 mx-1">
                  <div className="flex items-center justify-between text-sm gap-3">
                    <span className="text-muted-foreground min-w-0">
                      {totalServicosSelecionados} serviço
                      {totalServicosSelecionados > 1 ? "s" : ""} &middot;{" "}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {duracaoTotal} min
                      </span>
                    </span>
                    <span className="font-bold text-primary">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(precoTotalComBeneficio)}
                      {precoTotalComBeneficio < precoTotal && (
                        <span className="ml-1 text-xs font-normal text-muted-foreground line-through">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(precoTotal)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 mx-1">
                2. Escolha o Profissional
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {barbeiros.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum profissional cadastrado.
                  </p>
                ) : (
                  barbeiros.map((barbeiro) => (
                    <Card
                      key={barbeiro.id}
                      className={`cursor-pointer transition-all border ${selectedBarbeiro === barbeiro.id ? "bg-primary/10 border-primary shadow-sm shadow-primary/20" : "bg-card hover:bg-muted/50 border-border/50"} flex flex-col`}
                      onClick={() => setSelectedBarbeiro(barbeiro.id)}
                    >
                      <CardContent className="p-4 flex items-center gap-4 h-full">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
                          {barbeiro.foto_url ? (
                            <img
                              src={barbeiro.foto_url}
                              alt={barbeiro.nome}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="size-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-sm sm:text-base">
                            {barbeiro.nome}
                          </h3>
                        </div>
                        <div
                          className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedBarbeiro === barbeiro.id ? "border-primary bg-primary" : "border-muted-foreground/30"}`}
                        >
                          {selectedBarbeiro === barbeiro.id && (
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-foreground rounded-full" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 mx-1">
                3. Data e Hora
              </h2>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 items-center md:items-start w-full">
                {/* Calendário */}
                <div className="bg-card w-full md:w-auto shrink-0 p-3 sm:p-4 border border-border/50 rounded-2xl shadow-sm">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      if (!d) return;
                      // react-day-picker retorna datas como UTC midnight.
                      // Em UTC-3, getDate() retornaria o dia anterior.
                      // Corrigimos usando os valores UTC para criar uma data local correta.
                      const localDate = new Date(
                        d.getUTCFullYear(),
                        d.getUTCMonth(),
                        d.getUTCDate(),
                      );
                      setSelectedDate(localDate);
                    }}
                    locale={ptBR}
                    disabled={{ before: new Date() }}
                    className="w-full mx-auto flex justify-center [&_table]:text-xs [&_button]:h-8 [&_button]:w-8 sm:[&_table]:text-sm sm:[&_button]:h-9 sm:[&_button]:w-9"
                    classNames={{
                      day_selected:
                        "bg-primary text-primary-foreground font-bold hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    }}
                  />
                </div>

                {/* Horários */}
                <div
                  className="w-full flex-1 min-w-0 bg-card p-4 sm:p-5 border border-border/50 rounded-3xl shadow-sm flex flex-col"
                  style={{ minHeight: 240 }}
                >
                  <h3 className="text-xs sm:text-sm font-semibold mb-4 flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {selectedDate
                      ? format(selectedDate, "dd 'de' MMM", { locale: ptBR })
                      : "..."}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Antecedência mínima: {antecedenciaMinutos} minuto(s).
                  </p>

                  {!selectedDate ? (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                      Selecione um dia primeiro
                    </div>
                  ) : loadingHorarios ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-sm">
                      <Loader2 className="animate-spin size-6 mb-2 text-primary" />
                      Calculando horários...
                    </div>
                  ) : availableTimes.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-sm text-center px-2">
                      <p>Nenhum horário disponível para esta data.</p>
                      {mensagemFolgaDia && (
                        <div className="mt-4 rounded-md bg-amber-500/10 p-3 text-sm text-amber-600 border border-amber-500/20 font-medium text-center">
                          {barbeariaFolga ? "Barbearia de folga: " : "Profissional de folga: "} {mensagemFolgaDia}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={`rounded-full h-10 text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "shadow-md shadow-primary/20 scale-105"
                              : "hover:border-primary/50 hover:bg-primary/5"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold mb-6 mx-1">
                4. Identificação do Cliente
              </h2>

              <div className="space-y-6">
                {isAdmin && (
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-muted-foreground">
                      Vincular a um Cliente (Opcional)
                    </label>
                    <Popover
                      open={clientePopoverAberto}
                      onOpenChange={setClientePopoverAberto}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={clientePopoverAberto}
                          className="w-full h-12 sm:h-14 justify-between bg-card border-border/50 rounded-xl px-4 text-base font-normal transition-all hover:border-primary/50"
                        >
                          <div className="flex items-center gap-3">
                            <User className="size-5 text-muted-foreground" />
                            {clienteId === "NOVO" ? (
                              <span className="text-muted-foreground">
                                Lançar como Cliente Avulso
                              </span>
                            ) : (
                              <span className="font-medium">
                                {clientesAdmin.find(
                                  (c) => c.id.toString() === clienteId,
                                )?.nome}
                              </span>
                            )}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[--radix-popover-trigger-width] p-0"
                        align="start"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center border-b px-3">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                            <Input
                              placeholder="Buscar cliente..."
                              className="h-11 border-0 focus-visible:ring-0 px-0 bg-transparent"
                              value={buscaCliente}
                              onChange={(e) => setBuscaCliente(e.target.value)}
                            />
                          </div>
                          <div className="max-h-[300px] overflow-y-auto p-1 py-2 scrollbar-thin">
                            <button
                              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors"
                              onClick={() => {
                                setClienteId("NOVO");
                                setClientePopoverAberto(false);
                                setClienteNome("");
                                setClienteTel("");
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User className="size-4 text-primary" />
                                </div>
                                <span className="font-medium text-primary">
                                  + Lançar Cliente Avulso (Sem Conta)
                                </span>
                              </div>
                              {clienteId === "NOVO" && (
                                <Check className="size-4 text-primary" />
                              )}
                            </button>

                            {clientesAdmin
                              .filter(
                                (c) =>
                                  c.ativo !== false &&
                                  (c.nome
                                    .toLowerCase()
                                    .includes(
                                      buscaCliente.toLowerCase(),
                                    ) ||
                                    (c.telefone || "").includes(
                                      buscaCliente,
                                    )),
                              )
                              .map((c) => (
                                <button
                                  key={c.id}
                                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors"
                                  onClick={() => {
                                    setClienteId(c.id.toString());
                                    setClienteNome(c.nome);
                                    setClienteTel(c.telefone || "");
                                    setClientePopoverAberto(false);
                                  }}
                                >
                                  <div className="flex items-center gap-3 text-left">
                                    <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                                      <span className="text-xs font-bold text-muted-foreground">
                                        {c.nome
                                          .substring(0, 2)
                                          .toUpperCase()}
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {c.nome}
                                      </span>
                                      {c.telefone && (
                                        <span className="text-[10px] text-muted-foreground">
                                          {c.telefone}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {clienteId === c.id.toString() && (
                                    <Check className="size-4 text-primary" />
                                  )}
                                </button>
                              ))}
                          {clientesAdmin.filter(
                            (c) =>
                              c.ativo !== false &&
                              (c.nome
                                .toLowerCase()
                                .includes(buscaCliente.toLowerCase()) ||
                                (c.telefone || "").includes(buscaCliente)),
                          ).length === 0 &&
                            buscaCliente !== "" &&
                            !"+ Lançar Cliente Avulso (Sem Conta)"
                              .toLowerCase()
                              .includes(buscaCliente.toLowerCase()) && (
                              <p className="py-6 text-center text-sm text-muted-foreground">
                                Nenhum cliente encontrado.
                              </p>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {clienteId === "NOVO" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-muted-foreground">
                        {isAdmin ? "Nome do Cliente" : "Seu Nome Completo"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                        <Input
                          value={clienteNome}
                          onChange={(e) => setClienteNome(e.target.value)}
                          placeholder="Ex: Carlos Eduardo"
                          className="pl-12 h-12 sm:h-14 text-base bg-card border-border/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-muted-foreground">
                        {isAdmin
                          ? "WhatsApp do Cliente (Opcional)"
                          : "Seu WhatsApp (Opcional)"}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                        <Input
                          value={clienteTel}
                          onChange={(e) =>
                            setClienteTel(formatPhone(e.target.value))
                          }
                          placeholder="(11) 98888-7777"
                          className="pl-12 h-12 sm:h-14 text-base bg-card border-border/50"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {erro && (
                <p className="text-center font-bold text-red-400 bg-red-400/10 p-3 rounded-lg mb-4 text-sm">
                  {erro}
                </p>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="animate-in zoom-in fade-in duration-500 flex-1 flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 className="size-24 text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {isLoggedClient
                  ? "Agendamento Realizado!"
                  : "Agendamento Concluído!"}
              </h2>
              <p className="text-muted-foreground md:text-lg mb-10 max-w-sm mx-auto">
                {isLoggedClient ? (
                  <>
                    Sucesso! O seu agendamento do serviço{" "}
                    <strong>
                      {formatarServicosSelecionados(selectedServices, servicos)}
                    </strong>{" "}
                    foi realizado para o dia{" "}
                    <strong>
                      {selectedDate
                        ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                        : "—"}
                    </strong>{" "}
                    às <strong>{selectedTime ?? "—"}</strong>.
                  </>
                ) : (
                  <>
                    O cliente{" "}
                    <strong>
                      {clienteId === "NOVO"
                        ? clienteNome
                        : (clientesAdmin.find(
                            (c) => c.id.toString() === clienteId,
                          )?.nome ?? clienteNome)}
                    </strong>{" "}
                    foi agendado para{" "}
                    <strong>
                      {selectedDate && selectedTime
                        ? `${format(selectedDate, "dd/MM", { locale: ptBR })} às ${selectedTime}`
                        : (selectedTime ?? "—")}
                    </strong>
                    .
                  </>
                )}
              </p>
              {isAdmin ? (
                <Link href="/agendamentos">
                  <Button className="rounded-full px-10 h-12">OK</Button>
                </Link>
              ) : (
                <Button
                  className="rounded-full cursor-pointer px-10 h-12"
                  onClick={() => {
                    fetchAgendamentosAtivos();
                    setStep(1);
                    setSelectedServices([]);
                    setSelectedBarbeiro(null);
                    setSelectedDate(new Date());
                    setSelectedTime(null);
                    setClienteNome("");
                    setClienteTel("");
                    setClienteId("NOVO");
                  }}
                >
                  Fazer Outro Agendamento
                </Button>
              )}
            </div>
          )}
        </div>

        {showMobileStickyActions && (
          <div
            className={`fixed z-[60] pointer-events-none md:inset-x-0 md:px-3 sm:px-4 md:px-6 ${stickyBarPositionClass} ${
              (isLoggedClient || isAdmin)
                ? "max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[min(15.5rem,calc(100vw-1.5rem))]"
                : "max-md:inset-x-0 max-md:flex max-md:justify-center max-md:px-4"
            }`}
          >
            <div
              className={`pointer-events-auto w-full max-w-2xl md:mx-auto md:rounded-2xl md:border md:border-border/30 md:bg-background/40 md:px-4 md:py-3 md:shadow-2xl md:backdrop-blur-2xl max-md:p-0 ${
                isLoggedClient
                  ? ""
                  : "max-md:mx-auto max-md:w-[min(15.5rem,calc(100vw-1.5rem))] max-md:pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
              }`}
            >
              <div className="flex w-full flex-col items-center gap-1.5 max-md:px-1 md:gap-2">
              {step === 1 && totalServicosSelecionados > 0 && (
                <div className="hidden md:flex w-full flex-col items-center justify-center gap-0.5 text-center text-[11px] text-muted-foreground md:mb-0 md:flex-row md:justify-between md:gap-2 md:text-left md:text-xs">
                  <span className="max-w-[13rem] truncate md:max-w-none">
                    {totalServicosSelecionados} serviço
                    {totalServicosSelecionados > 1 ? "s" : ""} · {duracaoTotal} min
                  </span>
                  <span className="shrink-0 font-semibold text-primary tabular-nums">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(precoTotalComBeneficio)}
                  </span>
                </div>
              )}
              {(step === 3 || step === 4) && erro && (
                <p className="w-full max-w-[13.5rem] rounded-full bg-red-400/10 px-3 py-1.5 text-center text-[11px] font-semibold leading-snug text-red-400 md:max-w-none md:rounded-lg md:text-xs">
                  {erro}
                </p>
              )}
              <AnimatePresence>
                {(!stickyActionDisabled || loading) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full flex justify-center"
                  >
                    <Button
                      className="h-11 w-full max-w-[13.5rem] shrink-0 rounded-full text-sm font-bold shadow-md shadow-primary/15 md:max-w-none md:h-12 md:text-base md:shadow-lg md:shadow-primary/20"
                      onClick={handleStickyAction}
                    >
                      {(step === 3 || step === 4) && loading ? (
                        <>
                          <Loader2 className="mr-2 size-5 animate-spin" />
                          {stickyActionLabel}
                        </>
                      ) : (
                        stickyActionLabel
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        <Dialog open={limiteAtingido}>
          <DialogContent className="sm:max-w-md border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl" showCloseButton={false}>
            <DialogHeader>
              <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
              <DialogTitle className="text-center text-xl font-bold">Limite de Agendamentos</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground pt-2">
                Você atingiu o limite de <span className="font-bold text-foreground">{barbearia.max_agendamentos_cliente}</span> agendamento(s) ativo(s) nesta barbearia.
                Para marcar um novo horário, você precisa concluir ou cancelar um dos seus agendamentos atuais.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3 max-h-[40vh] overflow-y-auto pr-1 scrollbar-thin">
              {agendamentosAtivos.map((ag) => (
                <div key={ag.id} className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex flex-col gap-3 group hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {format(new Date(ag.data_hora), "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {format(new Date(ag.data_hora), "HH:mm")}
                      </p>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">
                      {ag.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Scissors className="w-3.5 h-3.5" />
                    <span className="truncate">
                      {ag.servicos?.map((s: any) => s.servico?.nome).join(", ")}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-1 h-9 rounded-xl border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 gap-2 font-semibold"
                    onClick={() => handleCancelarAgendamento(ag.id)}
                    disabled={cancelandoId === ag.id}
                  >
                    {cancelandoId === ag.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Ban className="w-3.5 h-3.5" />
                    )}
                    Cancelar este agendamento
                  </Button>
                </div>
              ))}
            </div>

            <DialogFooter className="mt-6 flex-col sm:flex-col gap-2">
              <Button 
                asChild 
                variant="ghost" 
                className="w-full rounded-xl text-muted-foreground"
              >
                <Link href="/cliente/agendamentos">Ver todos os meus agendamentos</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </BookingWrapper>
  );
}
