export interface PizzaOrderAssistentBorderOption {
  id: string;
  label: string;
  price: number;
  description?: string;
  badge?: string;
}

export interface PizzaOrderAssistentIngredientOption {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface PizzaOrderAssistentFlavorOption {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  ingredients: string[];
  badge?: string;
  suggestedExtraIngredientIds?: string[];
}

export interface PizzaOrderAssistentAdditionalOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  badge?: string;
}

export const defaultPizzaOrderAssistentBorders: PizzaOrderAssistentBorderOption[] =
  [
    {
      id: "camada-leite-ninho",
      label: "Camada de leite Ninho",
      price: 4.9,
      description: "Leite Ninho extra entre as camadas de açaí.",
      badge: "Mais pedida",
    },
    {
      id: "camada-creme-avela",
      label: "Camada de creme de avelã",
      price: 5.9,
      description: "Creme intenso para deixar o copo mais chocolatudo.",
    },
    {
      id: "camada-leite-condensado",
      label: "Camada de leite condensado",
      price: 3.9,
      description: "Doçura clássica para equilibrar o açaí.",
    },
    {
      id: "camada-cupuacu",
      label: "Camada de creme de cupuaçu",
      price: 5.5,
      description: "Creme tropical levemente ácido e bem cremoso.",
    },
    {
      id: "camada-mousse-morango",
      label: "Camada de mousse de morango",
      price: 5.5,
      description: "Combina bem com frutas e bombons picados.",
    },
  ];

export const defaultPizzaOrderAssistentIngredients: PizzaOrderAssistentIngredientOption[] =
  [
    {
      id: "chocoball",
      name: "Chocoball",
      price: 3.5,
      description: "Bolinha crocante de chocolate para finalizar.",
    },
    {
      id: "sonho-de-valsa",
      name: "Sonho de Valsa",
      price: 4.9,
      description: "Bombom picado em pedaços generosos.",
    },
    {
      id: "trento",
      name: "Trento",
      price: 4.9,
      description: "Wafer crocante picado por cima do açaí.",
    },
    {
      id: "leite-ninho",
      name: "Leite Ninho",
      price: 3.5,
      description: "Camada seca e doce para dar textura.",
    },
    {
      id: "pacoca",
      name: "Paçoca",
      price: 2.9,
      description: "Farofa de amendoim que combina com creme de avelã.",
    },
    {
      id: "granola",
      name: "Granola",
      price: 2.5,
      description: "Crocância leve para o copo tradicional.",
    },
    {
      id: "banana",
      name: "Banana",
      price: 2.5,
      description: "Fruta fresca fatiada na hora.",
    },
    {
      id: "morango",
      name: "Morango",
      price: 3.9,
      description: "Morango fresco para equilibrar o doce.",
    },
    {
      id: "coco-ralado",
      name: "Coco ralado",
      price: 2.5,
      description: "Finalização leve com sabor tropical.",
    },
    {
      id: "gotas-chocolate",
      name: "Gotas de chocolate",
      price: 3.5,
      description: "Chocolate em gotas para completar os cremes.",
    },
    {
      id: "ovomaltine",
      name: "Ovomaltine",
      price: 3.9,
      description: "Crocante maltado para copos bem doces.",
    },
    {
      id: "nutella",
      name: "Nutella",
      price: 5.9,
      description: "Creme de avelã extra na montagem.",
    },
  ];

export const defaultPizzaOrderAssistentFlavors: PizzaOrderAssistentFlavorOption[] =
  [
    {
      id: "prod-acai-300-tradicional",
      name: "Açaí 300ml Tradicional",
      price: 13.9,
      imageUrl: "/acaibolw.jpg",
      description: "Açaí cremoso, banana, granola e leite condensado.",
      ingredients: ["Açaí cremoso", "Banana", "Granola", "Leite condensado"],
      badge: "Individual",
      suggestedExtraIngredientIds: ["banana", "granola", "leite-ninho", "chocoball"],
    },
    {
      id: "prod-acai-300-chocoball",
      name: "Açaí 300ml Chocoball",
      price: 15.9,
      imageUrl: "/acai500.jpg",
      description: "Açaí cremoso, Chocoball, leite em pó e creme de avelã.",
      ingredients: ["Açaí cremoso", "Chocoball", "Leite em pó", "Creme de avelã"],
      badge: "Crocante",
      suggestedExtraIngredientIds: ["chocoball", "leite-ninho", "nutella", "gotas-chocolate"],
    },
    {
      id: "prod-acai-300-sonho-de-valsa",
      name: "Açaí 300ml Sonho de Valsa",
      price: 16.9,
      imageUrl: "/acai750.jpeg",
      description: "Açaí cremoso, Sonho de Valsa picado, morango e leite Ninho.",
      ingredients: ["Açaí cremoso", "Sonho de Valsa", "Morango", "Leite Ninho"],
      badge: "Bombom",
      suggestedExtraIngredientIds: ["sonho-de-valsa", "morango", "leite-ninho", "nutella"],
    },
    {
      id: "prod-acai-300-trento",
      name: "Açaí 300ml Trento",
      price: 16.9,
      imageUrl: "/acai750.jpg",
      description: "Açaí cremoso, Trento picado, paçoca e cobertura de chocolate.",
      ingredients: ["Açaí cremoso", "Trento", "Paçoca", "Cobertura de chocolate"],
      badge: "Chocolate",
      suggestedExtraIngredientIds: ["trento", "pacoca", "ovomaltine", "gotas-chocolate"],
    },
    {
      id: "prod-acai-500-tradicional",
      name: "Açaí 500ml Tradicional",
      price: 18.9,
      imageUrl: "/acai500.jpg",
      description: "Açaí cremoso, banana, morango, granola e leite condensado.",
      ingredients: ["Açaí cremoso", "Banana", "Morango", "Granola", "Leite condensado"],
      badge: "Clássico",
      suggestedExtraIngredientIds: ["banana", "morango", "granola", "leite-ninho"],
    },
    {
      id: "prod-acai-500-ninho-chocoball",
      name: "Açaí 500ml Ninho com Chocoball",
      price: 21.9,
      imageUrl: "/acaibolw.jpg",
      description: "Açaí cremoso, leite Ninho, Chocoball, banana e Nutella.",
      ingredients: ["Açaí cremoso", "Leite Ninho", "Chocoball", "Banana", "Nutella"],
      badge: "Favorito",
      suggestedExtraIngredientIds: ["chocoball", "leite-ninho", "banana", "nutella"],
    },
    {
      id: "prod-acai-500-sonho-de-valsa",
      name: "Açaí 500ml Sonho de Valsa",
      price: 22.9,
      imageUrl: "/acai750.jpeg",
      description: "Açaí cremoso, Sonho de Valsa, morango, leite Ninho e granola.",
      ingredients: ["Açaí cremoso", "Sonho de Valsa", "Morango", "Leite Ninho", "Granola"],
      badge: "Bombom",
      suggestedExtraIngredientIds: ["sonho-de-valsa", "morango", "leite-ninho", "granola"],
    },
    {
      id: "prod-acai-500-trento-pacoca",
      name: "Açaí 500ml Trento Paçoca",
      price: 22.9,
      imageUrl: "/acai750.jpg",
      description: "Açaí cremoso, Trento, paçoca, creme de avelã e leite condensado.",
      ingredients: ["Açaí cremoso", "Trento", "Paçoca", "Creme de avelã", "Leite condensado"],
      badge: "Crocante",
      suggestedExtraIngredientIds: ["trento", "pacoca", "nutella", "ovomaltine"],
    },
    {
      id: "prod-acai-750-tradicional",
      name: "Açaí 750ml Tradicional",
      price: 27.9,
      imageUrl: "/acai750.jpg",
      description: "Açaí cremoso, banana, morango, granola, leite em pó e leite condensado.",
      ingredients: ["Açaí cremoso", "Banana", "Morango", "Granola", "Leite em pó", "Leite condensado"],
      badge: "Grande",
      suggestedExtraIngredientIds: ["banana", "morango", "granola", "leite-ninho"],
    },
    {
      id: "prod-acai-750-premium-bombom",
      name: "Açaí 750ml Premium Bombom",
      price: 31.9,
      imageUrl: "/acaibolw.jpg",
      description: "Açaí cremoso, Sonho de Valsa, Chocoball, creme de avelã e leite Ninho.",
      ingredients: ["Açaí cremoso", "Sonho de Valsa", "Chocoball", "Creme de avelã", "Leite Ninho"],
      badge: "Premium",
      suggestedExtraIngredientIds: ["sonho-de-valsa", "chocoball", "nutella", "leite-ninho"],
    },
    {
      id: "prod-acai-750-trento-em-dobro",
      name: "Açaí 750ml Trento em Dobro",
      price: 32.9,
      imageUrl: "/acai500.jpg",
      description: "Açaí cremoso, Trento em dobro, paçoca, Nutella e cobertura de chocolate.",
      ingredients: ["Açaí cremoso", "Trento em dobro", "Paçoca", "Nutella", "Cobertura de chocolate"],
      badge: "Chocolate",
      suggestedExtraIngredientIds: ["trento", "pacoca", "nutella", "ovomaltine"],
    },
    {
      id: "prod-acai-750-frutas-granola",
      name: "Açaí 750ml Frutas e Granola",
      price: 29.9,
      imageUrl: "/acai750.jpeg",
      description: "Açaí cremoso, banana, morango, kiwi, granola e mel.",
      ingredients: ["Açaí cremoso", "Banana", "Morango", "Kiwi", "Granola", "Mel"],
      badge: "Frutas",
      suggestedExtraIngredientIds: ["banana", "morango", "granola", "coco-ralado"],
    },
  ];

export const defaultPizzaOrderAssistentCandies: PizzaOrderAssistentAdditionalOption[] =
  [
    {
      id: "adicional-chocoball",
      name: "Chocoball extra",
      price: 3.9,
      description: "Porção extra de bolinhas crocantes de chocolate.",
      badge: "Crocante",
      imageUrl: "/acai500.jpg",
    },
    {
      id: "adicional-sonho-de-valsa",
      name: "Sonho de Valsa picado",
      price: 5.5,
      description: "Bombom picado para colocar por cima ou entre camadas.",
      imageUrl: "/acai750.jpeg",
    },
    {
      id: "adicional-trento",
      name: "Trento picado",
      price: 5.5,
      description: "Wafer recheado com cobertura de chocolate.",
      imageUrl: "/acai750.jpg",
    },
    {
      id: "adicional-creme-avela",
      name: "Creme de avelã extra",
      price: 5.9,
      description: "Camada extra para finalizar o copo.",
      imageUrl: "/acaibolw.jpg",
    },
    {
      id: "adicional-oreo",
      name: "Oreo triturado",
      price: 4.5,
      description: "Biscoito crocante triturado na hora.",
      imageUrl: "/acai500.jpg",
    },
  ];

export const defaultPizzaOrderAssistentDrinks: PizzaOrderAssistentAdditionalOption[] =
  [
    {
      id: "bebida-agua-mineral",
      name: "Água mineral",
      price: 4.5,
      description: "Garrafa gelada de 500ml.",
      imageUrl: "/acaibolw.jpg",
    },
    {
      id: "bebida-guarana-lata",
      name: "Guaraná lata",
      price: 6.5,
      description: "Refrigerante lata 350ml.",
      imageUrl: "/acai500.jpg",
      badge: "Gelado",
    },
    {
      id: "bebida-mate-limao",
      name: "Mate com limão",
      price: 7.5,
      description: "Bebida leve para acompanhar o açaí.",
      imageUrl: "/acai750.jpeg",
    },
    {
      id: "bebida-suco-laranja",
      name: "Suco de laranja",
      price: 8.9,
      description: "Suco natural em garrafa individual.",
      imageUrl: "/acai750.jpg",
    },
  ];
