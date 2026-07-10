"use client";

import {
  ShoppingCartIcon
} from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import LandingHeader from "../../libs/react-ultimate-components/src/components/elements/LandingHeader";
import OrderFinalizationModal from "../../libs/react-ultimate-components/src/components/modals/OrderFinalizationModal";
import type {
  FinalizedOrderData,
  OrderFinalizationPayload,
  OrderFinalizationResult,
} from "../../libs/react-ultimate-components/src/components/modals/OrderFinalizationModal/index";
import Cart from "../../libs/react-ultimate-components/src/components/navigation/Cart";
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
        className="!min-h-[72px] items-center bg-frost px-4 py-2 backdrop-blur-md sm:min-h-0"
        bordered={false}
        size="sm"
        sticky
        style={{ zIndex: 9999 }}
      >
        <LandingHeader.Left className="min-w-0">
          <button
            type="button"
            onClick={handleGoHome}
            className="flex min-w-0 items-center gap-3"
          >
            <span aria-hidden="true" className="flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={56} height={56} className="h-6 w-6 sm:h-8 sm:w-8" />
            </span>

            <span className="flex min-w-0 flex-col items-start leading-tight">
              {/* Wordmark: the one place letter-spacing is deliberate. */}
              <Title
                as="span"
                className="min-w-0 truncate !text-product-name uppercase tracking-[0.28em] text-carbon"
              >
                {storeData.store.name}
              </Title>
            </span>
          </button>
        </LandingHeader.Left>

        <LandingHeader.Center className="hidden lg:flex">
          <PillNav items={navigationItems} />
        </LandingHeader.Center>

        <LandingHeader.Right className="flex items-center gap-5 sm:gap-6">
          <button
            type="button"
            onClick={() => {
              setShowMobileMenu(false);
              openCart();
            }}
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-control text-carbon transition-colors duration-base hover:bg-surface-alt"
            aria-label="Abrir carrinho"
          >
            <ShoppingCartIcon weight="regular" className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-medium text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </button>
          <MobileMenuToggleButton
            open={showMobileMenu}
            onToggle={setShowMobileMenu}
            className="rounded-control text-carbon lg:hidden !p-0"
          />
        </LandingHeader.Right>

        <MobilePanel open={showMobileMenu}>
          <li className="w-full list-none px-2">
            <div className="bg-bg-card p-5 text-left">
              <Subtitle as="span" className="text-pewter">
                Navegação rápida
              </Subtitle>
              <PillNav
                items={navigationItems}
                orientation="vertical"
                onNavigate={() => setShowMobileMenu(false)}
                className="mt-4"
                activeItemClassName="bg-primary-500 text-white"
                inactiveItemClassName="text-carbon hover:bg-surface-alt"
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
