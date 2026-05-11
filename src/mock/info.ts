export interface InfoMock {
  id: string;
  icon: "timer" | "delivery" | "menu";
  title: string;
}

export const landingInfos: InfoMock[] = [
  {
    id: "info-funcionamento",
    icon: "timer",
    title: "Açaí gelado até 23h30",
  },
  {
    id: "info-entrega",
    icon: "delivery",
    title: "Retire na loja ou receba em casa",
  },
  {
    id: "info-mix",
    icon: "menu",
    title: "300ml, 500ml e 750ml com adicionais",
  },
];
