export interface BannerMock {
  id: string;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetId: string;
}

export const promoBanners: BannerMock[] = [
  {
    id: "banner-acai-cremoso",
    image: "/acaibolw.jpg",
    badge: "Mais pedido",
    title: "Açaí cremoso com adicionais no capricho",
    subtitle:
      "Escolha o tamanho, combine frutas, leite Ninho, Chocoball, Sonho de Valsa e finalize do seu jeito.",
    ctaLabel: "Montar meu açaí",
    targetId: "cardapio",
  },
  {
    id: "banner-adicionais",
    image: "/acai500.jpg",
    badge: "Adicionais",
    title: "Chocoball, Trento, paçoca e creme de avelã",
    subtitle:
      "Monte uma camada extra cremosa e deixe seu copo com a combinação que mais combina com sua fome.",
    ctaLabel: "Ver adicionais",
    targetId: "cardapio",
  },
  {
    id: "banner-tamanhos",
    image: "/acai750.jpg",
    badge: "300ml, 500ml e 750ml",
    title: "Tamanhos para pedir sozinho ou dividir",
    subtitle:
      "Do copo individual ao grande, todos saem com açaí gelado, textura firme e adicionais selecionados.",
    ctaLabel: "Explorar cardápio",
    targetId: "cardapio",
  },
];
