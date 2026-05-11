import type {
  ICategory,
  IProduct,
  MediaImage,
  StoreData,
  StorePayload,
} from "../types";
import { menuCategories } from "./categories";
import { promoBanners } from "./banners";
import { menuProducts } from "./products";

const PUBLISHED_AT = "2025-01-10T18:00:00.000Z";

export const MONLEVADE_WHATSAPP = "5531985187963";

export const monlevadeStoreData: StoreData = {
  store: {
    name: "MonlevadeAçaí",
    slogan: "Açaí cremoso com frutas, bombons e adicionais para montar do seu jeito.",
    operation: {
      mondayToFriday: "11h às 23h30",
      saturday: "11h às 00h",
      sunday: "13h às 23h",
    },
    deliveryMethods: {
      pickOnStore: true,
      motoBoy: true,
      ownVehicle: true,
    },
    companyLogoUrl: null,
  },
  design: {
    primaryColor: "#5d0f99",
    secondaryColor: "#870f99",
    fontFamily: '"DM Sans Hnadgloves", "DM Sans", sans-serif',
  },
  legal: {
    cnpj: "38.221.440/0001-19",
  },
  address: {
    street: "Av. Wilson Alvarenga, 455 - Carneirinhos",
    city: "João Monlevade",
    state: "MG",
    zipCode: "35930-000",
  },
  contact: {
    phone: "(31) 98518-7963",
    email: "pedidos@monlevadeacai.com.br",
    whatsapp: MONLEVADE_WHATSAPP,
  },
  social_medias: {
    instagram: "https://instagram.com/monlevadeacai",
    facebook: "https://facebook.com/monlevadeacai",
  },
};

export const monlevadeCategories: ICategory[] = menuCategories.map(
  (category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    createdAt: PUBLISHED_AT,
    updatedAt: PUBLISHED_AT,
  })
);

const categoryIdBySlug = Object.fromEntries(
  monlevadeCategories.map((category) => [category.slug, category.id])
) as Record<string, string | undefined>;

export const monlevadeProducts: IProduct[] = menuProducts.map((product) => ({
  id: product.id,
  companyId: "company-monlevadeacai",
  categoryId: categoryIdBySlug[product.categorySlug] ?? null,
  name: product.name,
  slug: product.slug,
  description: product.ingredientes,
  status: "active",
  priceCents: Math.round(product.price * 100),
  currency: "BRL",
  isAvailable: true,
  coverImageUrl: product.image,
  imageUrls: [product.image],
  isPromotional: product.destaque ?? false,
  featuredPosition: product.featuredPosition,
  shareUrl: "https://monlevadeacai.com.br",
  createdAt: PUBLISHED_AT,
  updatedAt: PUBLISHED_AT,
}));

export const monlevadeMediaItems: MediaImage[] = promoBanners.map((banner) => ({
  id: banner.id,
  companyId: "company-monlevadeacai",
  imageUrl: banner.image,
  altText: banner.title,
  promotionalText: banner.badge,
  linkUrl: `#${banner.targetId}`,
  imageType: "banner",
  width: 1600,
  height: 900,
}));

export const monlevadeStorePayload: StorePayload = {
  storeData: monlevadeStoreData,
  categories: monlevadeCategories,
  products: monlevadeProducts,
  mediaItems: monlevadeMediaItems,
};
