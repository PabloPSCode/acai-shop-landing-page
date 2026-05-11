import type { MenuCategorySlug } from "./categories";

export interface MenuProductMock {
  id: string;
  slug: string;
  categorySlug: MenuCategorySlug;
  name: string;
  price: number;
  ingredientes: string;
  image: string;
  destaque?: boolean;
  featuredPosition?: number;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const menuProducts: MenuProductMock[] = [
  {
    id: "prod-acai-300-tradicional",
    slug: "acai-300ml-tradicional",
    categorySlug: "acai-300ml",
    name: "Açaí 300ml Tradicional",
    price: 13.9,
    ingredientes: "Açaí cremoso, banana, granola e leite condensado.",
    image: "/acaibolw.jpg",
    destaque: true,
    featuredPosition: 1,
    rating: 5,
  },
  {
    id: "prod-acai-300-chocoball",
    slug: "acai-300ml-chocoball",
    categorySlug: "acai-300ml",
    name: "Açaí 300ml Chocoball",
    price: 15.9,
    ingredientes: "Açaí cremoso, Chocoball, leite em pó e creme de avelã.",
    image: "/acai500.jpg",
    rating: 5,
  },
  {
    id: "prod-acai-300-sonho-de-valsa",
    slug: "acai-300ml-sonho-de-valsa",
    categorySlug: "acai-300ml",
    name: "Açaí 300ml Sonho de Valsa",
    price: 16.9,
    ingredientes: "Açaí cremoso, Sonho de Valsa picado, morango e leite Ninho.",
    image: "/acai750.jpeg",
    rating: 5,
  },
  {
    id: "prod-acai-300-trento",
    slug: "acai-300ml-trento",
    categorySlug: "acai-300ml",
    name: "Açaí 300ml Trento",
    price: 16.9,
    ingredientes: "Açaí cremoso, Trento picado, paçoca e cobertura de chocolate.",
    image: "/acai750.jpg",
    rating: 4,
  },
  {
    id: "prod-acai-500-tradicional",
    slug: "acai-500ml-tradicional",
    categorySlug: "acai-500ml",
    name: "Açaí 500ml Tradicional",
    price: 18.9,
    ingredientes: "Açaí cremoso, banana, morango, granola e leite condensado.",
    image: "/acai500.jpg",
    destaque: true,
    featuredPosition: 2,
    rating: 5,
  },
  {
    id: "prod-acai-500-ninho-chocoball",
    slug: "acai-500ml-ninho-chocoball",
    categorySlug: "acai-500ml",
    name: "Açaí 500ml Ninho com Chocoball",
    price: 21.9,
    ingredientes: "Açaí cremoso, leite Ninho, Chocoball, banana e Nutella.",
    image: "/acaibolw.jpg",
    destaque: true,
    featuredPosition: 3,
    rating: 5,
  },
  {
    id: "prod-acai-500-sonho-de-valsa",
    slug: "acai-500ml-sonho-de-valsa",
    categorySlug: "acai-500ml",
    name: "Açaí 500ml Sonho de Valsa",
    price: 22.9,
    ingredientes: "Açaí cremoso, Sonho de Valsa, morango, leite Ninho e granola.",
    image: "/acai750.jpeg",
    rating: 5,
  },
  {
    id: "prod-acai-500-trento-pacoca",
    slug: "acai-500ml-trento-pacoca",
    categorySlug: "acai-500ml",
    name: "Açaí 500ml Trento Paçoca",
    price: 22.9,
    ingredientes: "Açaí cremoso, Trento, paçoca, creme de avelã e leite condensado.",
    image: "/acai750.jpg",
    rating: 4,
  },
  {
    id: "prod-acai-750-tradicional",
    slug: "acai-750ml-tradicional",
    categorySlug: "acai-750ml",
    name: "Açaí 750ml Tradicional",
    price: 27.9,
    ingredientes: "Açaí cremoso, banana, morango, granola, leite em pó e leite condensado.",
    image: "/acai750.jpg",
    destaque: true,
    featuredPosition: 4,
    rating: 5,
  },
  {
    id: "prod-acai-750-premium-bombom",
    slug: "acai-750ml-premium-bombom",
    categorySlug: "acai-750ml",
    name: "Açaí 750ml Premium Bombom",
    price: 31.9,
    ingredientes: "Açaí cremoso, Sonho de Valsa, Chocoball, creme de avelã e leite Ninho.",
    image: "/acaibolw.jpg",
    destaque: true,
    featuredPosition: 5,
    rating: 5,
  },
  {
    id: "prod-acai-750-trento-em-dobro",
    slug: "acai-750ml-trento-em-dobro",
    categorySlug: "acai-750ml",
    name: "Açaí 750ml Trento em Dobro",
    price: 32.9,
    ingredientes: "Açaí cremoso, Trento em dobro, paçoca, Nutella e cobertura de chocolate.",
    image: "/acai500.jpg",
    destaque: true,
    featuredPosition: 6,
    rating: 5,
  },
  {
    id: "prod-acai-750-frutas-granola",
    slug: "acai-750ml-frutas-granola",
    categorySlug: "acai-750ml",
    name: "Açaí 750ml Frutas e Granola",
    price: 29.9,
    ingredientes: "Açaí cremoso, banana, morango, kiwi, granola e mel.",
    image: "/acai750.jpeg",
    rating: 4,
  },
];
