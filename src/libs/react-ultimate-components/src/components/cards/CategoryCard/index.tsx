"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import Image from "next/image";

export interface CategoryCardProps {
  /** Nome da categoria exibida no card. */
  name: string;
  /** Link para a listagem da categoria. */
  onSeeCategory: () => void;
  /** URL da imagem apresentada no card. */
  imgUrl?: string;
  /** Nome do ícone (Solar) exibido quando nenhuma imagem é enviada. */
  iconName?: string;
  /** Cor do ícone (Solar) exibido quando nenhuma imagem é enviada. */
  iconColor?: string;
  /** Classes extras aplicadas ao contêiner externo. */
  className?: string;
  /** Abre o link em uma nova aba (opcional). */
  newTab?: boolean;
}

/**
 * Card clicável para destacar categorias em vitrines ou seções de navegação.
 * Prioriza a imagem fornecida via `imgUrl` e, na ausência dela, renderiza o
 * ícone Solar informado em `iconName`, mantendo uma área padronizada e
 * responsiva.
 */
export default function CategoryCard({
  name,
  onSeeCategory,
  imgUrl,
  iconName,
  iconColor,
  className,
  newTab,
}: CategoryCardProps) {
  const resolvedIconName = iconName?.startsWith("solar:")
    ? iconName
    : iconName
    ? `solar:${iconName}`
    : undefined;

  const media = imgUrl ? (
    <Image
      src={imgUrl}
      alt={name}
      width={96}
      height={96}
      className="h-full w-full object-cover"
      loading="lazy"
      sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 64px"
    />
  ) : resolvedIconName ? (
    <Icon
      icon={resolvedIconName}
      className={clsx(
        iconColor
          ? `text-${iconColor} "h-8 w-8 sm:h-10 sm:w-10"`
          : "h-8 w-8 sm:h-10 sm:w-10"
      )}
    />
  ) : null;

  return (
    <div
      role="button"
      rel={newTab ? "noopener noreferrer" : undefined}
      className={clsx(
        "group flex flex-col items-center gap-3 rounded-surface bg-bg-card p-4 sm:p-5 text-foreground",
        "min-h-[168px] sm:min-h-[190px]",
        "transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className
      )}
      aria-label={`Ver categoria ${name}`}
      onClick={onSeeCategory}
    >
      <div className="flex w-full h-auto rounded-control items-center justify-center overflow-hidden bg-surface-alt text-primary-500 text-2xl sm:text-3xl">
        {media}
      </div>
      <span className="min-w-0 break-words text-product-name font-medium tracking-normal text-carbon text-center leading-tight line-clamp-2">
        {name}
      </span>
    </div>
  );
}
