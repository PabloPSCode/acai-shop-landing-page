"use client";

import {
  BowlFoodIcon,
  ListIcon,
  MotorcycleIcon,
  TimerIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "../libs/react-ultimate-components/src/components/buttons/button";
import CategoryCard from "../libs/react-ultimate-components/src/components/cards/CategoryCard";
import ProductCard from "../libs/react-ultimate-components/src/components/cards/ProductCard";
import VideoSection from "../libs/react-ultimate-components/src/components/elements/VideoSection";
import Paragraph from "../libs/react-ultimate-components/src/components/typography/Paragraph";
import {
  landingInfos,
  menuCategories,
  menuProducts,
} from "../mock";
import type { MenuCategorySlug } from "../mock/categories";
import { splitIngredientsList } from "../utils/format";
import { sendMessageWhatsapp } from "../utils/helpers";
import {
  FadeContainer,
  InfoIcon,
  RevealContainer,
  Section,
  Subtitle,
  Title,
  ZoomContainer,
} from "./components/ui";
import { useOrderCart } from "./providers/OrderCartProvider";
import { useStore } from "./providers/StoreProvider";

type CategoryFilter = "todos" | MenuCategorySlug;

const ACAI_CATEGORY_SLUGS = new Set<MenuCategorySlug>([
  "acai-300ml",
  "acai-500ml",
  "acai-750ml",
]);
const ORDER_ASSISTANT_CATEGORY_SLUGS = new Set<MenuCategorySlug>([]);

const INFO_ICON_BY_KEY = {
  timer: TimerIcon,
  delivery: MotorcycleIcon,
  menu: BowlFoodIcon,
} as const;

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("todos");
  const router = useRouter();
  const { addPizzaOrder, addOrder } = useOrderCart();
  const { storeData } = useStore();

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "todos") {
      return menuProducts;
    }

    return menuProducts.filter(
      (product) => product.categorySlug === selectedCategory,
    );
  }, [selectedCategory]);

  const handleCategorySelection = (category: CategoryFilter) => {
    setSelectedCategory(category);
    document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsappOrder = (productName?: string) => {
    const baseMessage = productName
      ? `Olá, quero finalizar meu pedido ${productName} na ${storeData.store.name}.`
      : `Olá, quero montar um açaí na ${storeData.store.name}.`;

    sendMessageWhatsapp(
      baseMessage,
      storeData.contact?.whatsapp ?? "553194817962",
    );
  };

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main
      id="topo"
      className="min-h-screen w-full bg-background text-foreground"
    >
      <section className="relative overflow-hidden ">
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-secondary-400 via-black/50 to-secondary-400 flex flex-col items-center justify-center" />
        <VideoSection
          size="full"
          videoUrl="/acai.mp4"
          showPlayPauseButton={false}
          showOverlay
          containerClassName="!min-h-[82vh] bg-transparent"
        />
      </section>

      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center h-full">
        <div className="mx-auto my-auto min-h-[95vh] flex w-full max-w-7xl items-center justify-center px-6 pb-16 lg:px-8">
          <RevealContainer
            once
            className="pointer-events-auto m-auto space-y-8"
          >
            <Title
              as="h1"
              className="max-w-[70vw] sm:max-w-[50vw]  xl:max-w-[50vw] text-center !text-3xl leading-[0.96] tracking-normal text-white sm:!text-5xl mt-12"
            >
              Açaí cremoso em Monlevade, montado com seus adicionais favoritos
            </Title>

            <Paragraph
              content="Escolha 300ml, 500ml ou 750ml e finalize com Chocoball, Sonho de Valsa, Trento, frutas e cremes."
              className="max-w-[70vw] sm:max-w-[50vw] xl:max-w-[40vw] mx-auto text-center !text-lg md:!text-xl leading-[1.55] text-white/80"
            />

            <FadeContainer
              once
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button
                type="button"
                label="Ver cardápio"
                onClick={() => scrollToSection("cardapio")}
                className="!rounded-full !bg-secondary-500 !px-8 !py-4 !text-white !shadow-none"
              />
            </FadeContainer>
          </RevealContainer>
        </div>
      </div>

      <Section id="cardapio" className="bg-white" containerClassName="gap-6">
        <FadeContainer
          once
          className="flex justify-center items-center mx-auto gap-3"
        >
          <ListIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          <Subtitle
            as="span"
            className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-center mx-auto text-black w-fit mt-1"
          >
            Cardápio
          </Subtitle>
        </FadeContainer>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleCategorySelection("todos")}
            className={[
              "rounded-full border px-5 py-3 text-sm font-semibold transition",
              selectedCategory === "todos"
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-border-card bg-bg-card text-foreground hover:bg-foreground/5",
            ].join(" ")}
          >
            Todas as opções
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
          {menuCategories.map((category, index) => (
            <ZoomContainer key={category.id} once delayMs={index * 55}>
              <CategoryCard
                name={category.name}
                imgUrl={category.image}
                className={[
                  "h-full",
                  selectedCategory === category.slug
                    ? "!border-primary-500 ring-2 ring-primary-300/60"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onSeeCategory={() => handleCategorySelection(category.slug)}
              />
            </ZoomContainer>
          ))}
        </div>
        <div className="grid gap-6 grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const isAcaiProduct = ACAI_CATEGORY_SLUGS.has(
              product.categorySlug,
            );
            const usesOrderAssistant = ORDER_ASSISTANT_CATEGORY_SLUGS.has(
              product.categorySlug,
            );

            return (
              <ZoomContainer
                key={product.id}
                once={index < 6}
                delayMs={(index % 3) * 65}
              >
                <div className="flex h-full flex-col gap-3">
                  <ProductCard
                    productId={product.id}
                    imageUrl={product.image}
                    title={product.name}
                    price={product.price}
                    productDescription={product.ingredientes}
                    ingredients={splitIngredientsList(product.ingredientes)}
                    rating={product.rating}
                    ctaLabel={
                      isAcaiProduct || usesOrderAssistant
                        ? "Montar açaí"
                        : "Tenho interesse"
                    }
                    className="h-full"
                    enablePizzaOrderAssistant={isAcaiProduct}
                    enableOrderAssistant={usesOrderAssistant}
                    onPizzaOrderFinish={(order) =>
                      addPizzaOrder(
                        {
                          productId: product.id,
                          title: product.name,
                          imageUrl: product.image,
                        },
                        order,
                      )
                    }
                    onOrderFinish={(order) =>
                      addOrder(
                        {
                          productId: product.id,
                          title: product.name,
                          imageUrl: product.image,
                        },
                        order,
                      )
                    }
                    onAddToCart={
                      isAcaiProduct || usesOrderAssistant
                        ? undefined
                        : () => handleWhatsappOrder(product.name)
                    }
                    onSeeProductDetails={() =>
                      router.push(`/produto/${product.slug}`)
                    }
                  />
                </div>
              </ZoomContainer>
            );
          })}
        </div>
      </Section>

     
    </main>
  );
}
