const createMapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const createEmbedMapUrl = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const createMapsGallery = (query) => {
  const encoded = encodeURIComponent(query);
  return [
    `https://maps.googleapis.com/maps/api/streetview?size=1280x720&location=${encoded}&fov=90&heading=20&pitch=0`,
    `https://maps.googleapis.com/maps/api/streetview?size=1280x720&location=${encoded}&fov=90&heading=130&pitch=0`,
    `https://maps.googleapis.com/maps/api/streetview?size=1280x720&location=${encoded}&fov=90&heading=250&pitch=0`,
  ];
};

const basePlaces = [
  {
    slug: "pousada-agua-marinha",
    name: "Pousada Água Marinha",
    category: "Hospedagem",
    location: "Pedra Menina, Dores do Rio Preto - ES",
    shortLocation: "Caparaó capixaba",
    mapsQuery: "Pousada Agua Marinha, Pedra Menina, Dores do Rio Preto - ES",
    description:
      "A Pousada Água Marinha é uma hospedagem acolhedora situada na região do Caparaó, conhecida por receber turistas que buscam descanso e contato com a natureza. A pousada oferece um ambiente simples, confortável e tranquilo, sendo uma boa opção para quem deseja conhecer as belezas naturais da região e aproveitar a atmosfera de montanha.",
    highlights: [
      "Café da manhã",
      "Quartos confortáveis",
      "Estacionamento",
      "Área verde para descanso",
      "Ambiente tranquilo",
      "Contato com a natureza",
    ],
    accent: "teal",
    localCover: "/places/agua-marinha/cover.jpeg",
    localGallery: [
      "/places/agua-marinha/cover.jpeg",
      "/places/agua-marinha/gallery-1.jpeg",
      "/places/agua-marinha/gallery-2.jpeg",
      "/places/agua-marinha/gallery-3.jpeg",
    ],
  },
  {
    slug: "pousada-patrimonio-dos-sonhos",
    name: "Pousada Patrimônio dos Sonhos",
    category: "Hospedagem",
    location: "Patrimônio da Penha, Divino de São Lourenço - ES",
    shortLocation: "Serra do Caparaó",
    mapsQuery: "Pousada Patrimonio dos Sonhos, Divino de Sao Lourenco - ES",
    description:
      "A Pousada Patrimônio dos Sonhos é uma hospedagem localizada na região de Alto Caparaó, próxima às belas paisagens naturais do Caparaó e às rotas de acesso ao Parque Nacional. A pousada é conhecida pelo ambiente tranquilo e aconchegante, ideal para quem deseja descansar em meio à natureza e aproveitar o clima de montanha da região.",
    highlights: [
      "Café da manhã",
      "Quartos confortáveis",
      "Vista para as montanhas",
      "Estacionamento",
      "Área externa para descanso",
      "Ambiente familiar e tranquilo",
    ],
    accent: "gold",
    localCover: "/places/patrimonio-dos-sonhos/cover.jpeg",
    localGallery: [
      "/places/patrimonio-dos-sonhos/cover.jpeg",
      "/places/patrimonio-dos-sonhos/gallery-1.jpeg",
      "/places/patrimonio-dos-sonhos/gallery-2.jpeg",
    ],
  },
  {
    slug: "restaurante-vovo-niquinha",
    name: "Restaurante Vovó Niquinha",
    category: "Gastronomia",
    location: "Guaçuí - ES",
    shortLocation: "Caparaó capixaba",
    mapsQuery: "Restaurante Vovo Niquinha, Guacui - ES",
    description:
      "O Restaurante Vovó Niquinha é um restaurante tradicional da região do Caparaó, conhecido pela comida caseira preparada com receitas simples e saborosas, lembrando a culinária de interior. O local é bastante procurado por turistas que visitam a região e desejam experimentar pratos típicos mineiros em um ambiente acolhedor e familiar. Com atendimento atencioso e clima tranquilo, o restaurante se destaca como uma boa opção para quem quer fazer uma refeição farta e saborosa após passeios pelas atrações naturais de Alto Caparaó.",
    highlights: [
      "Comida caseira",
      "Receitas de interior",
      "Ambiente acolhedor",
      "Atendimento atencioso",
      "Boa parada após os passeios",
    ],
    accent: "rust",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "toca-da-truta",
    name: "Toca da Truta",
    category: "Gastronomia",
    location: "BR-262, Parque Nacional do Caparaó, Ibitirama - ES",
    shortLocation: "Entorno do parque",
    mapsQuery: "Toca da Truta, Ibitirama - ES",
    description:
      "O Toca da Truta é um restaurante conhecido na região do Caparaó por seus pratos à base de truta, peixe muito comum nas águas frias das montanhas locais. O espaço oferece um ambiente agradável e cercado pela natureza, proporcionando uma experiência gastronômica típica da serra. Muito frequentado por turistas que visitam o Parque Nacional do Caparaó, o restaurante é uma ótima opção para quem deseja experimentar pratos regionais e aproveitar uma refeição tranquila em meio ao clima de montanha.",
    highlights: [
      "Pratos com truta",
      "Clima de serra",
      "Contato com a natureza",
      "Experiência gastronômica regional",
      "Parada clássica para visitantes do parque",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "alto-caparao",
    name: "Alto Caparaó",
    category: "Destino",
    location: "Alto Caparaó - MG",
    shortLocation: "Portal mineiro do Caparaó",
    mapsQuery: "Alto Caparao - MG",
    description:
      "Alto Caparaó é uma pequena cidade localizada na região da Serra do Caparaó, conhecida por suas belas paisagens naturais, clima de montanha e pela proximidade com o Parque Nacional do Caparaó. O município é um importante destino turístico para quem busca contato com a natureza, trilhas, cachoeiras e esportes de aventura. Além disso, Alto Caparaó é famoso pela produção de cafés especiais e por ser o principal ponto de acesso para quem deseja visitar o Pico da Bandeira, um dos picos mais altos do Brasil.",
    highlights: [
      "Porta de entrada do Parque Nacional do Caparaó",
      "Clima de montanha",
      "Cafés especiais",
      "Trilhas e cachoeiras",
      "Boa base para aventuras na serra",
    ],
    accent: "indigo",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "pico-do-cristal",
    name: "Pico do Cristal",
    category: "Natureza",
    location: "Parque Nacional do Caparaó, divisa MG/ES",
    shortLocation: "2.770 m de altitude",
    mapsQuery: "Pico do Cristal, Parque Nacional do Caparao",
    description:
      "O Pico do Cristal é uma das montanhas mais conhecidas da região do Caparaó, localizado dentro do Parque Nacional do Caparaó. Com cerca de 2.770 metros de altitude, é considerado o terceiro ponto mais alto do Brasil. O pico atrai muitos aventureiros e amantes de trilhas, pois oferece uma caminhada desafiadora e vistas impressionantes das montanhas ao redor. A paisagem natural, o clima de altitude e a proximidade com outros picos famosos fazem do Pico do Cristal um destino muito procurado por quem visita a região.",
    highlights: [
      "Terceiro ponto mais alto do Brasil",
      "Trilha desafiadora",
      "Vista panorâmica da serra",
      "Ambiente de altitude",
      "Integra o circuito do Parque Nacional",
    ],
    accent: "sky",
    localCover: "",
    localGallery: [],
  },
];

export const places = basePlaces.map((place) => {
  const mapsGallery = createMapsGallery(place.mapsQuery);
  const hasLocalGallery = place.localGallery.length > 0;

  return {
    ...place,
    mapsUrl: createMapsUrl(place.mapsQuery),
    embedMapUrl: createEmbedMapUrl(place.mapsQuery),
    imageSource: hasLocalGallery ? "repository" : "maps",
    coverImage: hasLocalGallery ? place.localCover : mapsGallery[0],
    gallery: hasLocalGallery ? place.localGallery : mapsGallery,
  };
});

export const categories = [
  {
    title: "Hospedagens",
    description: "Pousadas com clima de montanha, descanso e acesso prático às rotas do parque.",
    count: places.filter((place) => place.category === "Hospedagem").length,
  },
  {
    title: "Gastronomia",
    description: "Sabores da serra, comida caseira e pratos regionais para completar o roteiro.",
    count: places.filter((place) => place.category === "Gastronomia").length,
  },
  {
    title: "Destinos",
    description: "Cidades, picos e experiências para montar uma viagem completa pelo Caparaó.",
    count: places.filter((place) => ["Destino", "Natureza"].includes(place.category)).length,
  },
];

export const featuredStats = [
  { value: String(places.filter((place) => place.imageSource === "repository").length), label: "lugares com foto do repositório" },
  { value: String(places.filter((place) => place.imageSource === "maps").length), label: "lugares com galeria do Maps" },
  { value: "1", label: "roteiro pensado para o Caparaó" },
];
