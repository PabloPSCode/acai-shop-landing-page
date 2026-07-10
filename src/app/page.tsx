"use client";

import { ListIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import CategoryCard from "../libs/react-ultimate-components/src/components/cards/CategoryCard";
import ProductCard from "../libs/react-ultimate-components/src/components/cards/ProductCard";
import VideoSection from "../libs/react-ultimate-components/src/components/elements/VideoSection";
import Paragraph from "../libs/react-ultimate-components/src/components/typography/Paragraph";
import { menuCategories, menuProducts } from "../mock";
import type { MenuCategorySlug } from "../mock/categories";
import { splitIngredientsList } from "../utils/format";
import { sendMessageWhatsapp } from "../utils/helpers";
import {
  CTAButton,
  FadeContainer,
  HeroSection,
  RevealContainer,
  Section,
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
    <main id="topo" className="w-full bg-background text-foreground">
      <HeroSection
        scrim
        scrimClassName="bg-gradient-to-r from-secondary-400 via-black/50 to-secondary-400"
        background={
          <VideoSection
            size="full"
            videoUrl="/acai.mp4"
            showPlayPauseButton={false}
            showOverlay={false}
            containerClassName="!min-h-screen h-full bg-transparent"
          />
        }
      >
        <RevealContainer once className="flex flex-col items-center gap-6">
          <Title as="h1" className="max-w-3xl text-center text-white">
            Açaí cremoso em Monlevade, montado com seus adicionais favoritos
          </Title>

          <Paragraph
            content="Escolha 300ml, 500ml ou 750ml e finalize com Chocoball, Sonho de Valsa, Trento, frutas e cremes."
            className="mx-auto max-w-xl text-center !text-promo !font-normal text-white"
          />

          <FadeContainer
            once
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <CTAButton
              type="button"
              label="Ver cardápio"
              onClick={() => scrollToSection("cardapio")}
            />
          </FadeContainer>
        </RevealContainer>
      </HeroSection>

      <Section id="cardapio" containerClassName="gap-12">
        <FadeContainer
          once
          className="flex justify-center items-center mx-auto gap-3"
        >
          <ListIcon className="h-5 w-5 text-carbon" weight="regular" />
          <Title as="h2" className="w-fit text-center">
            Cardápio
          </Title>
        </FadeContainer>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => handleCategorySelection("todos")}
            className={[
              "min-h-8 rounded-control px-4 py-1 font-medium transition-colors duration-base",
              selectedCategory === "todos"
                ? "bg-primary-500 text-white"
                : "bg-surface-alt text-carbon hover:bg-cloud",
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
                  "h-full !rounded-surface !border-0 !shadow-none",
                  selectedCategory === category.slug
                    ? "!bg-surface-alt"
                    : "!bg-transparent",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onSeeCategory={() => handleCategorySelection(category.slug)}
              />
            </ZoomContainer>
          ))}
        </div>
        <div className="grid gap-8 grid-cols-2 xl:grid-cols-3">
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
                once
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
                    className="h-full !rounded-surface !border-0 !shadow-none hover:!translate-y-0 hover:!shadow-none"
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
