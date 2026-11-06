"use client";

import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";
import { useStoreCart } from "@/components/store/StoreCartProvider";
import { Button } from "@/components/ui/button";
import { checkoutUrlForProduct } from "@/lib/store-checkout-urls";
import { cn } from "@/lib/utils";

export type StoreRecipeSearchMeta = {
    query: string;
    inName: boolean;
    inDescription: boolean;
};

export type StoreRecipeCard = {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    kindLabel: string;
    priceLabel: string;
    /** Quando presente, a grade mostra onde o termo bateu e destaca ocorrências. */
    search?: StoreRecipeSearchMeta;
};

function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
    const q = query.trim();
    if (!q) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === q.toLowerCase() ? (
                    <mark
                        key={i}
                        className="rounded-sm bg-amber-200/90 px-0.5 text-foreground dark:bg-amber-400/40 dark:text-foreground"
                    >
                        {part}
                    </mark>
                ) : (
                    <Fragment key={i}>{part}</Fragment>
                ),
            )}
        </>
    );
}

function searchMatchLabel(meta: StoreRecipeSearchMeta): string {
    if (meta.inName && meta.inDescription) return "Termo no nome e na descrição";
    if (meta.inName) return "Termo no nome do produto";
    return "Termo na descrição";
}

type StoreRecipeGridProps = {
    items: StoreRecipeCard[];
    checkoutHref: string;
    ctaLabel: string;
    /** Grade um pouco mais compacta (ex.: página de linha). */
    variant?: "default" | "minimal";
};

export function StoreRecipeGrid({ items, checkoutHref, ctaLabel, variant = "default" }: StoreRecipeGridProps) {
    const compact = variant === "minimal";
    const { addOne } = useStoreCart();

    if (items.length === 0) {
        return (
            <p className="rounded-2xl border border-dashed border-border/80 bg-muted/25 px-6 py-12 text-center text-sm text-muted-foreground">
                Nenhum produto disponível nesta lista no momento.
            </p>
        );
    }

    return (
        <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3", compact ? "gap-x-6 gap-y-10" : "gap-7 sm:gap-8")}>
            {items.map(recipe => (
                <article
                    key={recipe.id}
                    className={cn(
                        "group flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card text-card-foreground shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.03] transition-all duration-300",
                        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:ring-primary/15",
                    )}
                >
                    <div
                        className={cn(
                            "relative overflow-hidden bg-gradient-to-b from-secondary/25 via-muted/20 to-muted/50",
                            compact ? "aspect-[4/5]" : "aspect-[5/6] sm:aspect-[4/5]",
                        )}
                    >
                        {recipe.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={recipe.imageUrl}
                                alt=""
                                key={recipe.imageUrl}
                                className="size-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                            />
                        ) : (
                            <div className="flex size-full flex-col items-center justify-center gap-2 px-4 text-center">
                                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary/70">Calmera</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Foto em breve</span>
                            </div>
                        )}
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-secondary/10 opacity-0 transition duration-300 group-hover:opacity-100"
                            aria-hidden
                        />
                    </div>

                    <div className={cn("flex flex-1 flex-col", compact ? "p-4 pb-5" : "p-5 pb-6")}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/85">{recipe.kindLabel}</p>
                        {recipe.search ? (
                            <p className="mt-1.5 text-[10px] font-medium leading-snug text-muted-foreground">
                                {searchMatchLabel(recipe.search)}
                            </p>
                        ) : null}
                        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-foreground sm:text-xl">
                            {recipe.search?.inName ? (
                                <HighlightMatch text={recipe.name} query={recipe.search.query} />
                            ) : (
                                recipe.name
                            )}
                        </h3>
                        <p
                            className={cn(
                                "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
                                compact ? "line-clamp-2" : "line-clamp-3",
                            )}
                        >
                            {recipe.search?.inDescription ? (
                                <HighlightMatch text={recipe.description} query={recipe.search.query} />
                            ) : (
                                recipe.description
                            )}
                        </p>
                        <p className="mt-4 font-serif text-lg font-semibold tabular-nums tracking-tight text-accent">{recipe.priceLabel}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2.5">
                            <Button
                                size="sm"
                                className={cn(
                                    "w-full rounded-full bg-primary text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-sm",
                                    "hover:bg-primary/92",
                                )}
                                onClick={() => {
                                    addOne(recipe.id);
                                    toast.success("Item adicionado ao carrinho.");
                                }}
                            >
                                Adicionar
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full rounded-full border-primary/25 bg-background/50 text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-primary/5"
                                asChild
                            >
                                <Link href={checkoutUrlForProduct(checkoutHref, recipe.id)}>{ctaLabel}</Link>
                            </Button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
