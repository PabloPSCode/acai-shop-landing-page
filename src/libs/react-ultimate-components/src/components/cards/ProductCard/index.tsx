"use client";

import { ShareNetworkIcon, StarIcon, TimerIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import OrderAssistentModal, {
  type OrderAssistentModalProps,
  type OrderAssistentOrder,
} from "../../modals/OrderAssistentModal/index";
import PizzaOrderAssistentModal, {
  defaultPizzaOrderAssistentFlavors,
  type PizzaOrderAssistentFlavorOption,
  type PizzaOrderAssistentModalProps,
  type PizzaOrderAssistentOrder,
} from "../../modals/PizzaOrderAssistentModal/index";
import { getDefaultDate } from "../../../../../../utils/format";
import { formatBRL } from "../../../utils/format";

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

interface ProductCardProps {
  /** Identificador único do produto. */
  productId?: string;
  /** URL da imagem do produto. */
  imageUrl: string;
  /** Título do produto. */
  title: string;
  /** Preço do produto (valor numérico). */
  price: number;
  /** Descrição resumida do produto. */
  productDescription?: string;
  /** Lista de ingredientes exibida abaixo da imagem. */
  ingredients?: string[];
  /** Avaliação do produto (0 a 5). */
  rating?: Rating;
  /** Quantidade de parcelas (opcional). */
  installments?: number;
  /** Valor de cada parcela (opcional). */
  installmentValue?: number;
  /** Rótulo do botão (ex.: “Adicionar ao carrinho”). */
  ctaLabel?: string;
  /** Rótulo do botão secundário */
  shareLabel?: string;
  /** Classe opcional aplicada ao cartão */
  className?: string;
  /** Callback ao clicar no botão de ação. */
  onAddToCart?: () => void;
  /** Callback ao concluir o assistente de pedido. */
  onPizzaOrderFinish?: (order: PizzaOrderAssistentOrder) => void;
  /** Callback ao concluir o assistente de pedido generico. */
  onOrderFinish?: (order: OrderAssistentOrder) => void;
  /** Callback ao clicar no botão de compartilhar. */
  onShare?: () => void;
  /** Callback ao ver os detalhes do produto. */
  onSeeProductDetails?: (productId?: string) => void;
  /** Define se o botão principal deve abrir o assistente de pizza. */
  enablePizzaOrderAssistant?: boolean;
  /** Define se o botão principal deve abrir o assistente de pedido generico. */
  enableOrderAssistant?: boolean;
  /** Props adicionais repassadas ao modal do assistente. */
  pizzaOrderAssistantProps?: Omit<
    PizzaOrderAssistentModalProps,
    "open" | "onClose" | "onFinish"
  >;
  /** Props adicionais repassadas ao modal do assistente de pedido generico. */
  orderAssistantProps?: Omit<
    OrderAssistentModalProps,
    "open" | "onClose" | "onFinish"
  >;

  /**
   * Se deve mostrar a promoção (deal).
   * Quando `true`, o card exibe preço promocional e um contador regressivo.
   */
  showDeal?: boolean;

  /** Preço da promoção. Quando não informado, usa `price` como fallback. */
  dealPrice?: number;

  /**
   * Horário (ISO string) em que a promoção termina.
   * - **Padrão:** 24 horas a partir do primeiro render.
   * - Ex.: "2025-12-31T23:59:59.000Z"
   */
  dealEndsWithIn?: string;
}

/**
 * Card de produto para listagens em e-commerce.
 * - **Responsivo:** tipografia, imagem e botões adaptam por breakpoint.
 * - **Acessível:** `alt` na imagem, labels ARIA e botão com foco visível.
 * - **Promoção com contador:** se `showDeal` for `true`, exibe preço promocional e um contador que
 *   por padrão encerra em 24 horas (ou no horário definido em `dealEndsWithIn`).
 */
export default function ProductCard({
  productId,
  imageUrl,
  title,
  price,
  productDescription,
  ingredients = [],
  rating,
  installments,
  installmentValue,
  ctaLabel = "Tenho interesse",
  shareLabel = "Compartilhar",
  onAddToCart,
  onPizzaOrderFinish,
  onOrderFinish,
  onShare,
  onSeeProductDetails,
  enablePizzaOrderAssistant = false,
  enableOrderAssistant = false,
  pizzaOrderAssistantProps,
  orderAssistantProps,
  showDeal,
  dealPrice,
  dealEndsWithIn,
  className,
}: ProductCardProps) {
  const [isPizzaAssistantOpen, setIsPizzaAssistantOpen] = useState(false);
  const [isOrderAssistantOpen, setIsOrderAssistantOpen] = useState(false);
  const formattedBasePrice = formatBRL(price);
  const effectiveDealPrice = dealPrice ?? price;
  const formattedDealPrice = formatBRL(effectiveDealPrice);

  const defaultEnd = useMemo(() => {
    return getDefaultDate();
  }, []);

  const dealEndsAt = useMemo<Date>(() => {
    if (!showDeal) return defaultEnd;
    if (!dealEndsWithIn) return defaultEnd;
    const parsed = new Date(dealEndsWithIn);
    return isNaN(parsed.getTime()) ? defaultEnd : parsed;
  }, [dealEndsWithIn, defaultEnd, showDeal]);

  const [remainingMs, setRemainingMs] = useState<number>(
    Math.max(0, dealEndsAt.getTime() - Date.now())
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!showDeal) return;
    setRemainingMs(Math.max(0, dealEndsAt.getTime() - Date.now()));

    intervalRef.current = window.setInterval(() => {
      setRemainingMs(() => {
        const next = Math.max(0, dealEndsAt.getTime() - Date.now());
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dealEndsAt, showDeal]);

  const dealExpired = showDeal ? remainingMs <= 0 : false;
  const shouldOpenPizzaAssistant = enablePizzaOrderAssistant && !dealExpired;
  const shouldOpenOrderAssistant = enableOrderAssistant && !dealExpired;

  const normalizedTitle = useMemo(
    () =>
      title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim(),
    [title]
  );

  const generatedFlavorId = useMemo(() => {
    if (productId) return productId;

    return title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [productId, title]);

  const assistantFlavorOptions = useMemo(() => {
    const baseOptions =
      pizzaOrderAssistantProps?.flavorOptions ?? defaultPizzaOrderAssistentFlavors;
    const matchedOption = baseOptions.find((option) => {
      const normalizedOptionName = option.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

      return option.id === generatedFlavorId || normalizedOptionName === normalizedTitle;
    });

    if (matchedOption) {
      return {
        options: baseOptions,
        selectedFlavorId: matchedOption.id,
      };
    }

    const derivedOption: PizzaOrderAssistentFlavorOption = {
      id: generatedFlavorId,
      name: title,
      price,
      description:
        productDescription ||
        ingredients.join(", ") ||
        "Opção selecionada a partir do card do produto.",
      imageUrl,
      ingredients,
      badge: "Seleção atual",
    };

    return {
      options: [derivedOption, ...baseOptions],
      selectedFlavorId: derivedOption.id,
    };
  }, [
    generatedFlavorId,
    imageUrl,
    ingredients,
    normalizedTitle,
    pizzaOrderAssistantProps?.flavorOptions,
    price,
    productDescription,
    title,
  ]);

  const handlePrimaryAction = () => {
    if (shouldOpenPizzaAssistant) {
      setIsPizzaAssistantOpen(true);
      return;
    }

    if (shouldOpenOrderAssistant) {
      setIsOrderAssistantOpen(true);
      return;
    }

    onAddToCart?.();
  };

  const handlePizzaAssistantFinish = (order: PizzaOrderAssistentOrder) => {
    onPizzaOrderFinish?.(order);
    setIsPizzaAssistantOpen(false);
  };

  const handleOrderAssistantFinish = (order: OrderAssistentOrder) => {
    onOrderFinish?.(order);
    setIsOrderAssistantOpen(false);
  };

  // === Estrelas de avaliação ===
  const renderStars = (value: Rating) => {
    const stars = Array.from({ length: 5 }, (_, i) => i < value);
    return (
      <div
        className="flex items-center gap-1 text-base sm:text-lg"
        aria-label={`Avaliação ${value} de 5`}
      >
        {stars.map((filled, i) => (
          <StarIcon
            key={i}
            size="1em"
            weight={filled ? "fill" : "regular"}
            className={filled ? "text-yellow-400" : "text-foreground/30"}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "group flex flex-col rounded-surface bg-bg-card text-foreground",
        "p-4 sm:p-5 gap-3 max-w-full w-full",
        "min-h-[470px] sm:min-h-[510px]",
        className
      )}
      role="article"
      aria-label={`Produto: ${title}`}
    >
      {/* Imagem */}
      <div className="mb-2 sm:mb-3">
        <button
          type="button"
          onClick={() => onSeeProductDetails?.(productId)}
          className="w-full overflow-hidden h-28 sm:h-32 md:h-40 flex items-center justify-center relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/40"
        >
          <Image
            src={imageUrl}
            alt={title}
            width={640}
            height={640}
            className="w-full object-cover"
            loading="lazy"
            sizes="(min-width: 768px) 33vw, 80vw"
          />
        </button>
      </div>

      {/* Título */}
      {ingredients.length > 0 && (
        <div className="mb-1 min-h-[88px] rounded-control bg-surface-alt px-4 py-3">
          <span className="text-nav font-medium tracking-normal text-primary-500">
            Composição
          </span>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-body text-pewter">
            {ingredients.slice(0, 4).map((ingredient) => (
              <li key={ingredient}>
                <span className="block line-clamp-1 break-words">
                  {ingredient}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3 className="min-w-0 break-words text-product-name font-medium tracking-normal text-carbon mb-1 line-clamp-2">
        {title}
      </h3>

      {/* Avaliação */}
      {typeof rating === "number" && (
        <div className="mb-2">{renderStars(rating)}</div>
      )}

      {/* Preços */}
      <div className="flex flex-col gap-1 mb-1">
        {showDeal && !dealExpired ? (
          <>
            {effectiveDealPrice < price && (
              <p className="text-body text-silver-fog line-through">
                {formattedBasePrice}
              </p>
            )}
            <p className="text-promo font-normal text-carbon">
              {formattedDealPrice}
            </p>
          </>
        ) : (
          <p className="text-promo font-normal text-carbon">
            {formattedBasePrice}
          </p>
        )}
      </div>

      {/* Parcelamento */}
      {installments && installmentValue ? (
        <p className="text-body text-graphite mb-2 sm:mb-3">
          Em até {installments}x de {formatBRL(installmentValue)} sem juros
        </p>
      ) : (
        <div className="mb-1 sm:mb-2" />
      )}

      {showDeal && (
        <div
          className="
                inline-flex gap-2 rounded-md
                 dark:text-primary-200
                px-3 py-1.5 text-[11px] sm:text-xs font-semibold
              "
        >
          <TimerIcon size={20} weight="bold" />
          <span>Confira a disponibilidade com o vendedor</span>
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-col gap-2 mt-auto">
        <button
          type="button"
          onClick={handlePrimaryAction}
          disabled={showDeal ? dealExpired : false}
          className={clsx(
            "inline-flex min-h-10 items-center justify-center gap-2 rounded-control px-4",
            "text-nav font-medium tracking-normal transition-colors duration-base",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer",
            showDeal && dealExpired
              ? "bg-cloud text-silver-fog cursor-not-allowed"
              : "bg-primary-500 text-white hover:bg-primary-600"
          )}
          aria-label={`${ctaLabel} - ${title}`}
        >
          {showDeal && dealExpired ? "Indisponível" : ctaLabel}
        </button>

        {shareLabel && onShare && (
          <button
            type="button"
            onClick={onShare}
            className="
            inline-flex min-h-10 items-center justify-between gap-2
            rounded-control bg-bg-card px-4
            text-nav font-medium tracking-normal text-graphite
            transition-colors duration-base hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
          "
            aria-label={`${shareLabel} - ${title}`}
          >
            <span>{shareLabel}</span>
            <ShareNetworkIcon size={18} weight="bold" />
          </button>
        )}
      </div>

      {shouldOpenPizzaAssistant ? (
        <PizzaOrderAssistentModal
          {...pizzaOrderAssistantProps}
          open={isPizzaAssistantOpen}
          onClose={() => setIsPizzaAssistantOpen(false)}
          onFinish={handlePizzaAssistantFinish}
          title={
            pizzaOrderAssistantProps?.title ?? `Monte seu pedido de ${title}`
          }
          resetOnOpen={pizzaOrderAssistantProps?.resetOnOpen ?? true}
          flavorOptions={assistantFlavorOptions.options}
          defaultFlavorMode={pizzaOrderAssistantProps?.defaultFlavorMode ?? 1}
          defaultFlavorIds={
            pizzaOrderAssistantProps?.defaultFlavorIds ?? [
              assistantFlavorOptions.selectedFlavorId,
            ]
          }
        />
      ) : null}

      {shouldOpenOrderAssistant ? (
        <OrderAssistentModal
          {...orderAssistantProps}
          open={isOrderAssistantOpen}
          onClose={() => setIsOrderAssistantOpen(false)}
          onFinish={handleOrderAssistantFinish}
          title={
            orderAssistantProps?.title ?? `Monte seu pedido de ${title}`
          }
          resetOnOpen={orderAssistantProps?.resetOnOpen ?? true}
          foodName={orderAssistantProps?.foodName ?? title}
          foodDescription={
            orderAssistantProps?.foodDescription ?? productDescription
          }
          foodIngredients={
            orderAssistantProps?.foodIngredients ?? ingredients
          }
          foodBasePrice={orderAssistantProps?.foodBasePrice ?? price}
        />
      ) : null}
    </div>
  );
}

export type { ProductCardProps };
