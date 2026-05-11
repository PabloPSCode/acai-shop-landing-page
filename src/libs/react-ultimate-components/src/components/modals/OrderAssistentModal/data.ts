import {
  defaultPizzaOrderAssistentDrinks,
  type PizzaOrderAssistentAdditionalOption,
} from "../PizzaOrderAssistentModal/data";

export type OrderAssistentAdditionalOption =
  PizzaOrderAssistentAdditionalOption;

export const defaultOrderAssistentCandies: OrderAssistentAdditionalOption[] = [
  {
    id: "complemento-chocoball",
    name: "Chocoball extra",
    price: 3.9,
    description: "Porção extra de bolinhas crocantes de chocolate.",
    badge: "Mais pedido",
    imageUrl: "/acai500.jpg",
  },
  {
    id: "complemento-sonho-de-valsa",
    name: "Sonho de Valsa picado",
    price: 5.5,
    description: "Bombom picado para finalizar o açaí.",
    imageUrl: "/acai750.jpeg",
  },
  {
    id: "complemento-trento",
    name: "Trento picado",
    price: 5.5,
    description: "Wafer crocante com cobertura de chocolate.",
    imageUrl: "/acai750.jpg",
  },
  {
    id: "complemento-leite-ninho",
    name: "Leite Ninho extra",
    price: 3.5,
    description: "Camada extra de leite em pó.",
    imageUrl: "/acaibolw.jpg",
  },
];

export const defaultOrderAssistentDrinks: OrderAssistentAdditionalOption[] =
  defaultPizzaOrderAssistentDrinks;
