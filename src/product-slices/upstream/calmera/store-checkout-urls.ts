import { ROUTES } from "@/lib/routes";

/** Link para checkout com um produto (compra direta), preservando login + callback quando necessário. */
export function checkoutUrlForProduct(checkoutHref: string, recipeId: string): string {
    const rid = encodeURIComponent(recipeId);
    if (checkoutHref.startsWith(ROUTES.LOGIN)) {
        const u = new URL(checkoutHref, "http://localhost");
        const baseCallback = u.searchParams.get("callbackUrl") || ROUTES.LOJA.CHECKOUT;
        const withRecipe = baseCallback.includes("recipeId=")
            ? baseCallback
            : `${baseCallback}${baseCallback.includes("?") ? "&" : "?"}recipeId=${rid}`;
        return `${ROUTES.LOGIN}?${new URLSearchParams({ callbackUrl: withRecipe }).toString()}`;
    }
    if (checkoutHref.includes("recipeId=")) return checkoutHref;
    return `${checkoutHref}${checkoutHref.includes("?") ? "&" : "?"}recipeId=${rid}`;
}
