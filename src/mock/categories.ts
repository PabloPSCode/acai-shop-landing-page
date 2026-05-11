export type MenuCategorySlug =
  | "acai-300ml"
  | "acai-500ml"
  | "acai-750ml";

export interface MenuCategoryMock {
  id: string;
  name: string;
  slug: MenuCategorySlug;
  description: string;
  image: string;
}

export const menuCategories: MenuCategoryMock[] = [
  {
    id: "cat-acai-300ml",
    name: "Açaí 300ml",
    slug: "acai-300ml",
    description: "Copo individual com açaí cremoso e adicionais clássicos.",
    image: "/acaibolw.jpg",
  },
  {
    id: "cat-acai-500ml",
    name: "Açaí 500ml",
    slug: "acai-500ml",
    description: "Tamanho equilibrado para caprichar nos toppings.",
    image: "/acai500.jpg",
  },
  {
    id: "cat-acai-750ml",
    name: "Açaí 750ml",
    slug: "acai-750ml",
    description: "Copo grande para dividir ou montar sem economia.",
    image: "/acai750.jpg",
  },
];
