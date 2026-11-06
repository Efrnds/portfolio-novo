"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStoreCart } from "@/components/store/StoreCartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/routes";
import { parseJsonResponse } from "@/lib/parse-json-response";
import type { StoreCouponQuoteInfo } from "@/lib/store-checkout";
import { cn } from "@/lib/utils";

type QuoteLine = {
    recipeId: string;
    recipeName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
};

function formatBrl(value: number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatCouponDateRange(fromIso: string | null, toIso: string | null) {
    const fmt = (iso: string) =>
        new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(iso));
    if (fromIso && toIso) return `${fmt(fromIso)} — ${fmt(toIso)}`;
    if (toIso) return `até ${fmt(toIso)}`;
    if (fromIso) return `a partir de ${fmt(fromIso)}`;
    return null;
}

const drawerMotion = {
    transitionDuration: "320ms",
    transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

export function StoreCartDrawer() {
    const router = useRouter();
    const { items, totalItems, remove, setQuantity, clear, replaceItems, meta, patchMeta } = useStoreCart();
    const [open, setOpen] = useState(false);
    const [lines, setLines] = useState<QuoteLine[]>([]);
    const [shippingBrl, setShippingBrl] = useState(0);
    const [discountBrl, setDiscountBrl] = useState(0);
    const [couponDraft, setCouponDraft] = useState((meta.couponCode ?? "").trim().toUpperCase());
    const [couponInfo, setCouponInfo] = useState<StoreCouponQuoteInfo | null>(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const drawerWasOpen = useRef(false);

    useEffect(() => {
        setCouponDraft((meta.couponCode ?? "").trim().toUpperCase());
    }, [meta.couponCode]);

    useEffect(() => {
        if (!open) {
            drawerWasOpen.current = false;
            setQuoteLoading(false);
            return;
        }
        const immediate = !drawerWasOpen.current;
        drawerWasOpen.current = true;
        let cancelled = false;
        const delayMs = immediate ? 0 : 160;
        const t = window.setTimeout(() => {
            void (async () => {
                setQuoteLoading(true);
                try {
                    const res = await fetch("/api/checkout/quote", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            items,
                            couponCode: meta.couponCode,
                            shippingMethodId: null,
                            shippingZipCode: "",
                            quoteContext: "drawer",
                        }),
                    });
                    const data = await parseJsonResponse<{
                        lines?: QuoteLine[];
                        shippingBrl?: number;
                        discountBrl?: number;
                        shippingMethod?: { id: string } | null;
                        coupon?: { code: string } | null;
                        couponInfo?: StoreCouponQuoteInfo | null;
                    }>(res);
                    if (cancelled) return;
                    if (!data) {
                        setLines([]);
                        setShippingBrl(0);
                        setDiscountBrl(0);
                        setCouponInfo(null);
                        return;
                    }
                    setLines(data.lines ?? []);
                    setShippingBrl(data.shippingBrl ?? 0);
                    setDiscountBrl(data.discountBrl ?? 0);
                    setCouponInfo(data.couponInfo ?? null);
                    const nextCode = (data.coupon?.code ?? meta.couponCode)?.trim().toUpperCase() || null;
                    const prevCode = meta.couponCode?.trim().toUpperCase() || null;
                    if (nextCode !== prevCode) {
                        patchMeta({ couponCode: nextCode });
                    }
                } finally {
                    if (!cancelled) setQuoteLoading(false);
                }
            })();
        }, delayMs);
        return () => {
            cancelled = true;
            window.clearTimeout(t);
        };
    }, [open, items, meta.couponCode, patchMeta]);

    const lineById = useMemo(() => new Map(lines.map(l => [l.recipeId, l])), [lines]);
    const subtotal = lines.reduce((acc, line) => acc + line.totalPrice, 0);
    const total = Math.max(0, subtotal - discountBrl + shippingBrl);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="relative isolate h-10 shrink-0 rounded-full border-border bg-card px-3"
                    aria-label="Abrir carrinho"
                >
                    <ShoppingBag className="size-4" />
                    {totalItems > 0 ? (
                        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                            {totalItems}
                        </span>
                    ) : null}
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                showCloseButton
                overlayClassName="z-[70] bg-black/45 supports-backdrop-filter:backdrop-blur-[2px]"
                className={cn(
                    "z-[70] flex h-full max-h-[100dvh] w-full max-w-md flex-col gap-0 border-l border-border bg-card p-0 shadow-2xl",
                    "data-[side=right]:w-full data-[side=right]:sm:max-w-md",
                    "motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
                )}
                style={drawerMotion}
            >
                <div className="flex min-h-0 flex-1 flex-col">
                    <SheetHeader className="shrink-0 space-y-1 border-b border-border/70 px-4 pb-3 pt-4 pr-14 text-left">
                        <SheetTitle className="font-serif text-xl font-bold tracking-tight">Carrinho</SheetTitle>
                        <SheetDescription className="text-xs leading-relaxed text-muted-foreground">
                            Entrega e CEP são confirmados no checkout. Cupom e totais são estimados aqui.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 py-4">
                        {items.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
                        ) : (
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="store-cart-coupon" className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                        Cupom
                                    </label>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                                        <Input
                                            id="store-cart-coupon"
                                            value={couponDraft}
                                            onChange={e => setCouponDraft(e.target.value.toUpperCase())}
                                            placeholder="Código (opcional)"
                                            className="h-10 min-w-0 flex-1 rounded-xl font-mono text-xs uppercase"
                                            autoComplete="off"
                                            spellCheck={false}
                                        />
                                        <div className="flex shrink-0 gap-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="secondary"
                                                className="h-10 flex-1 rounded-xl sm:flex-none"
                                                onClick={() => patchMeta({ couponCode: couponDraft.trim() || null })}
                                            >
                                                Aplicar
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                className="h-10 rounded-xl px-3 text-muted-foreground"
                                                onClick={() => patchMeta({ couponCode: null })}
                                            >
                                                Limpar
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {couponInfo ? (
                                    <div
                                        className={cn(
                                            "rounded-xl border p-3 text-[11px] leading-relaxed transition-opacity duration-200",
                                            couponInfo.applied
                                                ? "border-emerald-500/25 bg-emerald-500/[0.06]"
                                                : "border-border/80 bg-muted/30",
                                            quoteLoading && "opacity-60",
                                        )}
                                    >
                                        <p className="font-semibold tracking-wide text-foreground">{couponInfo.code}</p>
                                        {couponInfo.label ? <p className="mt-0.5 text-muted-foreground">{couponInfo.label}</p> : null}
                                        {couponInfo.restrictToLineName ? (
                                            <p className="mt-1 text-muted-foreground">Só na linha: {couponInfo.restrictToLineName}</p>
                                        ) : null}
                                        {formatCouponDateRange(couponInfo.activeFromIso, couponInfo.activeToIso) ? (
                                            <p className="mt-1 text-muted-foreground">
                                                {formatCouponDateRange(couponInfo.activeFromIso, couponInfo.activeToIso)}
                                            </p>
                                        ) : null}
                                        <p className="mt-1 text-muted-foreground">
                                            Usos: {couponInfo.usageCount}
                                            {couponInfo.usageLimit != null ? ` / ${couponInfo.usageLimit}` : " (sem limite)"}
                                        </p>
                                        {couponInfo.applied ? (
                                            <p className="mt-2 font-medium text-emerald-800 dark:text-emerald-400">
                                                Desconto: − {formatBrl(couponInfo.discountBrl)}
                                            </p>
                                        ) : couponInfo.rejectReason ? (
                                            <p className="mt-2 font-medium text-amber-800 dark:text-amber-400">{couponInfo.rejectReason}</p>
                                        ) : null}
                                    </div>
                                ) : null}

                                <ul className="space-y-3">
                                    {items.map(item => {
                                        const line = lineById.get(item.recipeId);
                                        const lineTotal = line ? line.totalPrice : null;
                                        return (
                                            <li
                                                key={item.recipeId}
                                                className="rounded-2xl border border-border/80 bg-muted/10 p-3.5 shadow-sm ring-1 ring-border/30"
                                            >
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-semibold leading-snug text-foreground">
                                                            {line?.recipeName ?? "Produto"}
                                                        </p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {line ? (
                                                                <>
                                                                    {formatBrl(line.unitPrice)} cada
                                                                    {lineTotal != null ? (
                                                                        <span className="text-foreground"> · {formatBrl(lineTotal)}</span>
                                                                    ) : null}
                                                                </>
                                                            ) : quoteLoading ? (
                                                                <span className="animate-pulse">Atualizando preço…</span>
                                                            ) : (
                                                                "Preço indisponível"
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            max={99}
                                                            value={item.quantity}
                                                            onChange={e => {
                                                                const raw = e.target.value;
                                                                const n = Number.parseInt(raw, 10);
                                                                setQuantity(item.recipeId, Number.isFinite(n) ? Math.max(1, Math.min(99, n)) : 1);
                                                            }}
                                                            className="h-9 w-[4.25rem] shrink-0 rounded-lg text-center text-sm tabular-nums"
                                                            aria-label="Quantidade"
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            onClick={() => remove(item.recipeId)}
                                                        >
                                                            Remover
                                                        </Button>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    className="mt-3 h-9 w-full rounded-xl sm:w-auto"
                                                    onClick={() => {
                                                        replaceItems([{ recipeId: item.recipeId, quantity: item.quantity }]);
                                                        setOpen(false);
                                                        router.push(ROUTES.LOJA.CHECKOUT);
                                                    }}
                                                >
                                                    Só este item — checkout
                                                </Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    {items.length > 0 ? (
                        <SheetFooter className="shrink-0 gap-3 border-t border-border/70 bg-muted/15 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                            <div className="w-full space-y-1.5 text-sm">
                                <div className="flex justify-between gap-4 text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="tabular-nums text-foreground">{formatBrl(subtotal)}</span>
                                </div>
                                <div className="flex justify-between gap-4 text-muted-foreground">
                                    <span>Desconto</span>
                                    <span className="tabular-nums text-foreground">− {formatBrl(discountBrl)}</span>
                                </div>
                                <div className="flex justify-between gap-4 text-muted-foreground">
                                    <span>Entrega (no checkout)</span>
                                    <span className="tabular-nums text-foreground">{formatBrl(shippingBrl)}</span>
                                </div>
                                <div className="flex justify-between gap-4 border-t border-border/60 pt-2 text-base font-semibold text-foreground">
                                    <span>Total estimado</span>
                                    <span className="tabular-nums">{formatBrl(total)}</span>
                                </div>
                            </div>
                            <div className="grid w-full grid-cols-2 gap-2">
                                <Button type="button" variant="outline" className="h-11 rounded-xl" onClick={() => clear()}>
                                    Limpar
                                </Button>
                                <Button asChild className="h-11 rounded-xl">
                                    <Link href={ROUTES.LOJA.CHECKOUT} onClick={() => setOpen(false)}>
                                        Checkout
                                    </Link>
                                </Button>
                            </div>
                        </SheetFooter>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    );
}
