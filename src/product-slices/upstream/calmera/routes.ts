/** Prefixo de todas as rotas internas (ERP / painel). A raiz `/` é a vitrine. */
export const PAINEL = "/painel" as const;

export const ROUTES = {
    /** Vitrine (pública) */
    LOJA: {
        HOME: "/",
        /** Redireciona para pedidos — use CONTA_PEDIDOS / CONTA_PERFIL em links novos */
        CONTA: "/conta",
        CONTA_PEDIDOS: "/conta/pedidos",
        CONTA_PERFIL: "/conta/perfil",
        CHECKOUT: "/checkout",
        BUSCA: "/busca",
        /** Listagem de produtos publicados na linha (slug da tabela ProductLine). */
        LINE: (slug: string) => `/linha/${slug}`,
        PRIVACIDADE: "/privacidade",
        TERMOS: "/termos-de-uso",
        TROCAS: "/trocas-e-devolucoes",
        CONTATO: "/contato",
    },
    CUIDADOS: "/cuidados",
    DASHBOARD: `${PAINEL}`,
    LOGIN: "/login",
    ANALISE: `${PAINEL}/analise`,
    ANALISE_LOJA: `${PAINEL}/analise/loja`,
    AUDITORIA: `${PAINEL}/auditoria`,
    RELATORIOS: `${PAINEL}/relatorios`,
    CLIENTES: {
        LIST: `${PAINEL}/clientes`,
        NEW: `${PAINEL}/clientes/novo`,
    },
    INSUMOS: {
        LIST: `${PAINEL}/insumos`,
        NEW: `${PAINEL}/insumos/novo`,
    },
    COMPRAS: {
        NEW: `${PAINEL}/compras/novo`,
    },
    RECEITAS: {
        LIST: `${PAINEL}/receitas`,
        NEW: `${PAINEL}/receitas/novo`,
    },
    CAIXA: {
        LIST: `${PAINEL}/caixa`,
        NEW: `${PAINEL}/caixa/novo`,
        DESPESA: `${PAINEL}/caixa/despesa`,
        ENTRADA: `${PAINEL}/caixa/entrada`,
    },
    VENDAS: {
        LIST: `${PAINEL}/vendas`,
    },
    WHATSAPP: `${PAINEL}/whatsapp`,
    ORCAMENTOS: {
        LIST: `${PAINEL}/orcamentos`,
        NEW: `${PAINEL}/orcamentos/novo`,
    },
    PRODUCAO: {
        LIST: `${PAINEL}/producao`,
        NEW: `${PAINEL}/producao/novo`,
    },
    CONFIGURACOES: {
        MAIN: `${PAINEL}/configuracoes`,
        LOJA: `${PAINEL}/configuracoes/loja`,
        CATEGORIAS: `${PAINEL}/configuracoes/categorias`,
        ESTOQUE_MINIMO: `${PAINEL}/configuracoes/estoque-minimo`,
        APARENCIA: `${PAINEL}/configuracoes/aparencia`,
        LINHAS_LOJA: `${PAINEL}/configuracoes/linhas`,
        USUARIOS: `${PAINEL}/configuracoes/usuarios`,
        WHATSAPP: `${PAINEL}/whatsapp`,
    },
} as const;
