const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
const baseUrl = import.meta.env.BASE_URL || "/";

const localAsset = (path) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

const withApiKey = (url) => {
  if (!googleMapsApiKey) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}key=${encodeURIComponent(googleMapsApiKey)}`;
};

const createMapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const createEmbedMapUrl = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

const createMapsGallery = (query) => {
  const encoded = encodeURIComponent(query);
  return [
    withApiKey(
      `https://maps.googleapis.com/maps/api/streetview?size=1280x720&location=${encoded}&fov=90&heading=20&pitch=0`,
    ),
    withApiKey(
      `https://maps.googleapis.com/maps/api/streetview?size=1280x720&location=${encoded}&fov=90&heading=130&pitch=0`,
    ),
    withApiKey(
      `https://maps.googleapis.com/maps/api/streetview?size=1280x720&location=${encoded}&fov=90&heading=250&pitch=0`,
    ),
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
  {
    slug: "paris-franca",
    name: "Paris",
    category: "Destino",
    location: "Paris - Franca",
    shortLocation: "Europa ocidental",
    mapsQuery: "Paris, France",
    description:
      "Paris e um destino urbano classico, com monumentos, bairros historicos e forte cena gastronomica. E ideal para roteiros culturais com caminhadas e experiencias visuais marcantes.",
    highlights: [
      "Arquitetura historica",
      "Museus e arte",
      "Bairros para caminhar",
      "Gastronomia internacional",
      "Experiencia cultural intensa",
    ],
    accent: "gold",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "singapore",
    name: "Singapore",
    category: "Destino",
    location: "Singapore",
    shortLocation: "Sudeste asiatico",
    mapsQuery: "Singapore",
    description:
      "Singapore combina modernidade, areas verdes e excelente infraestrutura para turismo. E um destino pratico para quem gosta de cidade organizada com atracoes contemporaneas.",
    highlights: [
      "Cidade moderna",
      "Parques e jardins urbanos",
      "Transporte eficiente",
      "Vida noturna ativa",
      "Gastronomia multicultural",
    ],
    accent: "teal",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "roma-italia",
    name: "Roma",
    category: "Destino",
    location: "Roma - Italia",
    shortLocation: "Mediterraneo europeu",
    mapsQuery: "Rome, Italy",
    description:
      "Roma e um destino com forte valor historico, ruinas famosas e atmosfera vibrante. A cidade e excelente para roteiros de patrimonio, culinaria e fotografia urbana.",
    highlights: [
      "Historia antiga",
      "Patrimonio arquitetonico",
      "Pontos turisticos iconicos",
      "Culinaria tradicional",
      "Passeios a pe",
    ],
    accent: "rust",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "bangkok-tailandia",
    name: "Bangkok",
    category: "Destino",
    location: "Bangkok - Tailandia",
    shortLocation: "Asia tropical",
    mapsQuery: "Bangkok, Thailand",
    description:
      "Bangkok e uma metropole intensa com templos, mercados e grande diversidade de experiencias. Funciona bem para roteiros urbanos dinamicos com foco em cultura local.",
    highlights: [
      "Templos tradicionais",
      "Mercados locais",
      "Ritmo urbano intenso",
      "Comida de rua",
      "Vida noturna variada",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "bali-indonesia",
    name: "Bali",
    category: "Destino",
    location: "Bali - Indonesia",
    shortLocation: "Ilha tropical",
    mapsQuery: "Bali, Indonesia",
    description:
      "Bali e conhecida por paisagens tropicais, cultura local e clima de relaxamento. E um destino versatil para combinar natureza, praia e experiencias de bem-estar.",
    highlights: [
      "Praias e natureza",
      "Templos e cultura local",
      "Ambiente de descanso",
      "Cafes e roteiros lifestyle",
      "Boa base para passeios",
    ],
    accent: "sky",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "phuket-tailandia",
    name: "Phuket",
    category: "Destino",
    location: "Phuket - Tailandia",
    shortLocation: "Costa do mar de Andaman",
    mapsQuery: "Phuket, Thailand",
    description:
      "Phuket oferece praias conhecidas, mirantes e infraestrutura turistica consolidada. E uma escolha forte para roteiros focados em mar, lazer e passeios costeiros.",
    highlights: [
      "Praias famosas",
      "Passeios de barco",
      "Mirantes panoramicos",
      "Infraestrutura turistica",
      "Vida noturna de praia",
    ],
    accent: "indigo",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "tokyo-japao",
    name: "Tokyo",
    category: "Destino",
    location: "Tokyo - Japao",
    shortLocation: "Leste asiatico",
    mapsQuery: "Tokyo, Japan",
    description:
      "Tokyo mistura tecnologia, tradicao e bairros com identidades muito diferentes. O destino funciona para roteiros contemporaneos e culturais no mesmo dia.",
    highlights: [
      "Cidade de alta tecnologia",
      "Bairros com perfis distintos",
      "Templos e areas historicas",
      "Cultura pop e design",
      "Gastronomia ampla",
    ],
    accent: "teal",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "cappadocia-turquia",
    name: "Cappadocia",
    category: "Destino",
    location: "Capadocia - Turquia",
    shortLocation: "Anatolia central",
    mapsQuery: "Cappadocia, Turkey",
    description:
      "A Capadocia e um destino de paisagem unica, conhecido pelas formacoes rochosas e voos de balao. E ideal para viagens cenicas e experiencias ao ar livre.",
    highlights: [
      "Paisagem geologica unica",
      "Passeios de balao",
      "Mirantes naturais",
      "Hoteis em rocha",
      "Experiencia fotogenica",
    ],
    accent: "gold",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "new-york-usa",
    name: "New York",
    category: "Destino",
    location: "Nova York - EUA",
    shortLocation: "Costa leste americana",
    mapsQuery: "New York, USA",
    description:
      "New York e um destino urbano de ritmo acelerado, com pontos iconicos, museus e bairros multiculturais. Excelente para roteiros intensos com muito conteudo cultural.",
    highlights: [
      "Marcos urbanos globais",
      "Museus e espetaculos",
      "Bairros multiculturais",
      "Parques urbanos",
      "Programacao o ano inteiro",
    ],
    accent: "rust",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "london-reino-unido",
    name: "London",
    category: "Destino",
    location: "Londres - Reino Unido",
    shortLocation: "Europa setentrional",
    mapsQuery: "London, UK",
    description:
      "Londres une tradicao historica e vida urbana moderna com grande oferta cultural. E um destino consistente para roteiros de museus, parques e gastronomia internacional.",
    highlights: [
      "Patrimonio historico",
      "Museus renomados",
      "Parques amplos",
      "Bairros diversos",
      "Conexao facil de transporte",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
];

export const places = basePlaces.map((place) => {
  const mapsGallery = createMapsGallery(place.mapsQuery);
  const hasLocalGallery = place.localGallery.length > 0;
  const normalizedLocalGallery = place.localGallery.map((path) => localAsset(path));
  const normalizedLocalCover = place.localCover ? localAsset(place.localCover) : "";

  return {
    ...place,
    mapsUrl: createMapsUrl(place.mapsQuery),
    embedMapUrl: createEmbedMapUrl(place.mapsQuery),
    imageSource: hasLocalGallery ? "repository" : "maps",
    coverImage: hasLocalGallery ? normalizedLocalCover : mapsGallery[0],
    gallery: hasLocalGallery ? normalizedLocalGallery : mapsGallery,
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
