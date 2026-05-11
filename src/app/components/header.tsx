"use client";

import {
  BowlFoodIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import LandingHeader from "../../libs/react-ultimate-components/src/components/elements/LandingHeader";
import OrderFinalizationModal from "../../libs/react-ultimate-components/src/components/modals/OrderFinalizationModal";
import Cart from "../../libs/react-ultimate-components/src/components/navigation/Cart";
import type {
  FinalizedOrderData,
  OrderFinalizationPayload,
  OrderFinalizationResult,
} from "../../libs/react-ultimate-components/src/components/modals/OrderFinalizationModal/index";
import {
  showToastError,
  showToastLoading,
  showToastSuccess,
} from "../../libs/react-ultimate-components/src/utils/toasts";
import { landingNavigationItems, MONLEVADE_WHATSAPP } from "../../mock";
import { sendMessageWhatsapp } from "../../utils/helpers";
import { useOrderCart } from "../providers/OrderCartProvider";
import { useStore } from "../providers/StoreProvider";
import {
  MobileMenuToggleButton,
  MobilePanel,
  PillNav,
  Subtitle,
  Title,
} from "./ui";
import Image from "next/image";

const ORDER_FINALIZATION_ADDRESSES_STORAGE_KEY =
  "@monlevadeacai:order-finalization-addresses";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isOrderFinalizationOpen, setIsOrderFinalizationOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    items,
    itemCount,
    isCartOpen,
    openCart,
    closeCart,
    clearCart,
    setItems,
  } = useOrderCart();
  const { storeData } = useStore();
  const pickupLocationText = [
    storeData.address?.street,
    storeData.address?.zipCode ? `CEP ${storeData.address.zipCode}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  const normalizedPathname = pathname.replace(/^\/sites\/[^/]+/, "") || "/";

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const navigationItems = useMemo(
    () =>
      landingNavigationItems.map((item) => {
        const href =
          item.href.startsWith("#") && normalizedPathname !== "/"
            ? `/${item.href}`
            : item.href;

        return {
          label: item.label,
          href,
        };
      }),
    [normalizedPathname],
  );

  const handleGoHome = () => {
    router.push("/");
  };

  const handleProceedToCheckout = () => {
    if (!items.length) return;

    closeCart();
    setIsOrderFinalizationOpen(true);
  };

  const handleFinalizeOrder = async ({
    selectedAddress,
    items: orderItems,
    fulfillmentMethod,
    deliveryFee,
    total,
    customerWhatsapp,
  }: OrderFinalizationPayload): Promise<OrderFinalizationResult | void> => {
    showToastLoading("Gerando link de pagamento...");

    try {
      const response = await fetch("/api/asaas/payment-link", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          items: orderItems,
          selectedAddress,
          fulfillmentMethod,
          deliveryFee,
          total,
          customerWhatsapp,
        }),
      });

      const responseBody = (await response.json()) as {
        message?: string;
        paymentLinkUrl?: string;
        paymentLinkId?: string | null;
        orderReference?: string | null;
      };

      if (!response.ok || !responseBody.paymentLinkUrl) {
        throw new Error(
          responseBody.message ??
            "Não foi possível gerar o link de pagamento no momento.",
        );
      }

      toast.dismiss("loading");
      showToastSuccess("Link de pagamento gerado com sucesso.");
      clearCart();

      return {
        paymentLinkUrl: responseBody.paymentLinkUrl,
        orderReference:
          typeof responseBody.orderReference === "string"
            ? responseBody.orderReference
            : undefined,
        paymentLinkId:
          typeof responseBody.paymentLinkId === "string"
            ? responseBody.paymentLinkId
            : undefined,
        total,
      };
    } catch (error) {
      toast.dismiss("loading");
      showToastError(
        error instanceof Error
          ? error.message
          : "Não foi possível gerar o link de pagamento agora. Tente novamente.",
      );
    }
  };

  const handleSharePaymentLink = ({
    paymentLinkUrl,
    orderReference,
    total,
    fulfillmentMethod,
  }: FinalizedOrderData) => {
    const message = [
      `Olá! Quero compartilhar o link de pagamento do meu pedido na ${storeData.store.name}.`,
      orderReference ? `Pedido: ${orderReference}` : null,
      fulfillmentMethod === "pickup"
        ? "Forma de recebimento: retirada na loja"
        : "Forma de recebimento: entrega",
      `Total: ${formatBRL(total)}`,
      `Link de pagamento: ${paymentLinkUrl}`,
    ]
      .filter(Boolean)
      .join("\n");

    sendMessageWhatsapp(
      message,
      storeData.contact?.whatsapp ?? MONLEVADE_WHATSAPP,
    );
  };

  return (
    <>
      <LandingHeader.Root
        className="bg-secondary-500 shadow-sm backdrop-blur-md min-h-[80px] pt-5"
        bordered={false}
        sticky
        style={{ zIndex: 9999 }}
      >
        <LandingHeader.Left className="min-w-0">
          <button
            type="button"
            onClick={handleGoHome}
            className="flex min-w-0 items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center rounded-full bg-primary-500 text-white "
            >
              <Image src="/logo.png" alt="Logo" width={56} height={56} className="h-12 w-12 sm:h-14 sm:w-14" />
            </span>

            <span className="flex min-w-0 flex-col items-start leading-tight">
              <Title
                as="span"
                className="min-w-0 truncate !text-2xl leading-none !sm:text-4xl text-white"
              >
                {storeData.store.name}
              </Title>
            </span>
          </button>
        </LandingHeader.Left>

        <LandingHeader.Center className="hidden lg:flex">
          <PillNav
            items={navigationItems}
            className="border border-white/20 bg-white/10"
            activeItemClassName="bg-white text-secondary-700 shadow-sm"
            inactiveItemClassName="text-white/85 hover:bg-white/10 hover:text-white"
          />
        </LandingHeader.Center>

        <LandingHeader.Right className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              setShowMobileMenu(false);
              openCart();
            }}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-card bg-white text-foreground transition hover:border-primary-500 hover:text-primary-600"
            aria-label="Abrir carrinho"
          >
            <ShoppingCartIcon weight="bold" className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-semibold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </button>
          <MobileMenuToggleButton
            open={showMobileMenu}
            onToggle={setShowMobileMenu}
            className="rounded-full border border-border-card bg-white"
          />
        </LandingHeader.Right>

        <MobilePanel open={showMobileMenu}>
          <li className="w-full list-none px-2">
            <div className="rounded-[28px] border border-border-card bg-white p-5 text-left shadow-sm">
              <Subtitle
                as="span"
                className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-primary-600"
              >
                Navegação rápida
              </Subtitle>
              <PillNav
                items={navigationItems}
                orientation="vertical"
                onNavigate={() => setShowMobileMenu(false)}
                className="mt-4"
                itemClassName="border border-border-card"
                activeItemClassName="border-primary-500 bg-primary-500 text-white shadow-sm"
                inactiveItemClassName="bg-white text-foreground hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
              />
            </div>
          </li>
        </MobilePanel>
      </LandingHeader.Root>

      <Cart
        products={items}
        isOpen={isCartOpen}
        onToggleOpen={closeCart}
        onProductsChange={setItems}
        onProceedToCheckout={handleProceedToCheckout}
        checkoutButtonText="Finalizar pedido"
        keepBuyingButtonText="Continuar comprando"
        emptyCartMessage="Seu carrinho está vazio."
      />

      <OrderFinalizationModal
        open={isOrderFinalizationOpen}
        onClose={() => setIsOrderFinalizationOpen(false)}
        items={items}
        onFinalize={handleFinalizeOrder}
        onSharePaymentLink={handleSharePaymentLink}
        pickupLocationText={pickupLocationText}
        storageKey={ORDER_FINALIZATION_ADDRESSES_STORAGE_KEY}
      />
    </>
  );
}
