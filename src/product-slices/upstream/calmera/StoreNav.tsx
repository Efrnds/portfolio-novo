"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { DropdownMenu as DM } from "radix-ui";
import { ChevronDown, LayoutDashboard, Loader2, Search, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { StoreCartDrawer } from "@/components/store/StoreCartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type StoreNavLine = { name: string; slug: string; id?: string };

type StoreNavUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isAdmin?: boolean;
};

type StoreNavProps = {
    lines: StoreNavLine[];
    user: StoreNavUser | null;
    loginHref: string;
    storeName?: string | null;
};

export function StoreNav({ lines, user, loginHref, storeName }: StoreNavProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [q, setQ] = useState("");
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        setQ(searchParams.get("q") ?? "");
    }, [searchParams]);

    const onSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const term = q.trim();
            const linha = searchParams.get("linha") ?? "";
            const tipo = searchParams.get("tipo") ?? "";
            const destaque = searchParams.get("destaque") ?? "";
            startTransition(() => {
                const p = new URLSearchParams();
                if (term) p.set("q", term);
                if (linha) p.set("linha", linha);
                if (tipo) p.set("tipo", tipo);
                if (destaque === "1") p.set("destaque", "1");
                const qs = p.toString();
                router.push(qs ? `${ROUTES.LOJA.BUSCA}?${qs}` : ROUTES.LOJA.BUSCA);
            });
        },
        [q, router, searchParams],
    );

    const displayName = user?.name?.trim() || user?.email?.split("@")[0] || "Conta";

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-card/70">
            <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2.5 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-x-4 lg:gap-x-6">
                <div className="col-start-1 row-start-1 flex min-w-0 max-w-[calc(100%-3.5rem)] items-center gap-3 sm:max-w-none md:max-w-none md:gap-4">
                    <Link href={ROUTES.LOJA.HOME} className="flex shrink-0 items-center py-0.5 transition-opacity hover:opacity-90">
                        <Image
                            src="/Prancheta%2005.png"
                            alt={storeName?.trim() || "Calmera"}
                            width={220}
                            height={55}
                            className="h-5 w-auto sm:h-6"
                            sizes="(max-width: 768px) 140px, 180px"
                            priority
                        />
                    </Link>
                    <nav className="hidden min-w-0 items-center gap-1 overflow-x-auto md:flex md:pl-1 md:border-l md:border-border/50">
                        {lines.map(line => (
                            <Link
                                key={line.slug}
                                href={ROUTES.LOJA.LINE(line.slug)}
                                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                            >
                                {line.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-2.5 md:col-start-3 md:gap-3">
                    {user?.isAdmin ? (
                        <Button
                            size="sm"
                            variant="secondary"
                            className="inline-flex h-9 shrink-0 gap-1.5 rounded-full border border-border/80 px-2.5 text-[11px] font-bold uppercase tracking-wide shadow-xs sm:px-3"
                            asChild
                        >
                            <Link href={ROUTES.DASHBOARD} title="Painel interno">
                                <LayoutDashboard className="size-3.5 shrink-0" />
                                <span className="max-[380px]:sr-only">Painel</span>
                            </Link>
                        </Button>
                    ) : null}
                    <StoreCartDrawer />
                    {user ? (
                        <DM.Root>
                            <DM.Trigger
                                type="button"
                                className={cn(
                                    "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 pl-2 text-sm font-medium text-foreground",
                                    "outline-none hover:bg-secondary/30 focus-visible:ring-2 focus-visible:ring-primary/35",
                                )}
                            >
                                {user.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.image} alt="" className="size-7 rounded-full object-cover" />
                                ) : (
                                    <span className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <UserRound className="size-4" />
                                    </span>
                                )}
                                <span className="hidden max-w-[7rem] truncate sm:inline">{displayName}</span>
                                <ChevronDown className="size-4 text-muted-foreground" />
                            </DM.Trigger>
                            <DM.Portal>
                                <DM.Content
                                    align="end"
                                    sideOffset={8}
                                    className="z-50 min-w-[220px] overflow-hidden rounded-xl border border-border bg-card p-1 text-card-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                                >
                                    <div className="px-3 py-2">
                                        <p className="truncate text-xs font-semibold text-foreground">{displayName}</p>
                                        {user.email ? (
                                            <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
                                        ) : null}
                                    </div>
                                    <DM.Separator className="my-1 h-px bg-border" />
                                    {user.isAdmin ? (
                                        <DM.Item
                                            className="cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground outline-none data-highlighted:bg-secondary/40"
                                            asChild
                                        >
                                            <Link href={ROUTES.DASHBOARD}>
                                                <span className="flex items-center gap-2">
                                                    <LayoutDashboard className="size-4 shrink-0 text-primary" />
                                                    Painel interno
                                                </span>
                                            </Link>
                                        </DM.Item>
                                    ) : null}
                                    <DM.Item
                                        className="cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground outline-none data-highlighted:bg-secondary/40"
                                        asChild
                                    >
                                        <Link href={ROUTES.LOJA.CONTA_PEDIDOS}>Meus pedidos</Link>
                                    </DM.Item>
                                    <DM.Item
                                        className="cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground outline-none data-highlighted:bg-secondary/40"
                                        asChild
                                    >
                                        <Link href={ROUTES.LOJA.CONTA_PERFIL}>Meu perfil</Link>
                                    </DM.Item>
                                    <DM.Separator className="my-1 h-px bg-border" />
                                    <DM.Item
                                        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-red-600 outline-none data-highlighted:bg-red-50"
                                        onSelect={event => {
                                            event.preventDefault();
                                            void (async () => {
                                                try {
                                                    await signOut({
                                                        redirectTo: ROUTES.LOJA.HOME,
                                                        redirect: false,
                                                    });
                                                    router.refresh();
                                                    router.replace(ROUTES.LOJA.HOME);
                                                } catch {
                                                    toast.error("Não foi possível sair. Tente novamente.");
                                                }
                                            })();
                                        }}
                                    >
                                        Sair
                                    </DM.Item>
                                </DM.Content>
                            </DM.Portal>
                        </DM.Root>
                    ) : (
                        <Button size="sm" variant="outline" className="h-10 shrink-0 rounded-full border-border bg-card px-4 text-xs font-bold uppercase tracking-wide" asChild>
                            <Link href={loginHref}>Entrar na loja</Link>
                        </Button>
                    )}
                </div>

                <form
                    onSubmit={onSearch}
                    className="col-span-2 col-start-1 row-start-2 flex min-w-0 md:col-span-1 md:col-start-2 md:row-start-1"
                >
                    <div className="relative flex min-h-11 w-full min-w-0 flex-1 items-center sm:min-h-12">
                        <Input
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            placeholder="Buscar no catálogo por nome ou descrição…"
                            className="h-11 w-full rounded-full border border-border/50 bg-background/85 py-2.5 pl-4 pr-14 text-[15px] leading-snug text-foreground shadow-inner ring-1 ring-border/30 placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/25 sm:h-12 sm:pr-16 sm:text-base"
                            aria-label="Buscar na loja"
                        />
                        <button
                            type="submit"
                            disabled={pending}
                            className={cn(
                                "absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition",
                                "hover:bg-primary/92 disabled:opacity-60 sm:right-2 sm:size-10",
                            )}
                            aria-label="Pesquisar"
                        >
                            {pending ? <Loader2 className="size-[1.125rem] animate-spin sm:size-5" /> : <Search className="size-[1.125rem] sm:size-5" strokeWidth={2.25} />}
                        </button>
                    </div>
                </form>

                {lines.length > 0 ? (
                    <nav className="col-span-2 row-start-3 -mx-1 flex gap-1.5 overflow-x-auto pb-0.5 md:hidden">
                        {lines.map(line => (
                            <Link
                                key={line.slug}
                                href={ROUTES.LOJA.LINE(line.slug)}
                                className="shrink-0 rounded-full border border-border/60 bg-card/90 px-3.5 py-1.5 text-[11px] font-semibold text-foreground shadow-sm"
                            >
                                {line.name}
                            </Link>
                        ))}
                    </nav>
                ) : null}
            </div>
        </header>
    );
}
