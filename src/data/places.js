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
    slug: "pousada-recanto-da-lua",
    name: "Pousada Recanto da Lua",
    category: "Hospedagem",
    location: "Alto Caparao - MG",
    shortLocation: "Caparao mineiro",
    mapsQuery: "Pousada Recanto da Lua Alto Caparao MG",
    description:
      "Hospedagem com proposta de descanso em clima de montanha, pensada para roteiros tranquilos na regiao do Caparao.",
    highlights: [
      "Ambiente de serra",
      "Boa para descanso",
      "Roteiro de montanha",
      "Hospedagem regional",
      "Acesso aos atrativos",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "pousada-patrimonio-dos-sonhos",
    name: "Pousada Patrimonio dos Sonhos",
    category: "Hospedagem",
    location: "Divino de Sao Lourenco - ES",
    shortLocation: "Caparao capixaba",
    mapsQuery: "Pousada Patrimonio dos Sonhos Divino de Sao Lourenco ES",
    description:
      "Pousada com estrutura aconchegante e perfil familiar, ideal para quem busca descanso e natureza.",
    highlights: [
      "Cafe da manha",
      "Quartos confortaveis",
      "Estacionamento",
      "Vista para montanhas",
      "Area externa",
      "Ambiente familiar",
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
    slug: "pousada-agua-marinha",
    name: "Pousada Agua Marinha",
    category: "Hospedagem",
    location: "Dores do Rio Preto - ES",
    shortLocation: "Caparao capixaba",
    mapsQuery: "Pousada Agua Marinha Dores do Rio Preto ES",
    description:
      "Hospedagem com proposta acolhedora para visitantes que buscam descanso e contato com a natureza.",
    highlights: [
      "Cafe da manha",
      "Quartos confortaveis",
      "Estacionamento",
      "Area verde",
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
    slug: "pousada-vovo-zinho",
    name: "Pousada Vovo Zinho",
    category: "Hospedagem",
    location: "Guacui - ES",
    shortLocation: "Caparao capixaba",
    mapsQuery: "Pousada Vovo Zinho Guacui ES",
    description:
      "Hospedagem regional com proposta simples e acolhedora para quem quer explorar o circuito do Caparao.",
    highlights: [
      "Clima familiar",
      "Boa base de roteiro",
      "Ambiente acolhedor",
      "Perfil regional",
      "Descanso na viagem",
    ],
    accent: "rust",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "pousada-do-luis",
    name: "Pousada do Luis",
    category: "Hospedagem",
    location: "Ibitirama - ES",
    shortLocation: "Entorno do parque",
    mapsQuery: "Pousada do Luis Ibitirama ES",
    description:
      "Pousada em area de natureza, indicada para visitantes que buscam tranquilidade e acesso aos atrativos da serra.",
    highlights: [
      "Hospedagem em area verde",
      "Clima de serra",
      "Ambiente tranquilo",
      "Base para passeios",
      "Roteiro de natureza",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "pousada-casa-do-lago-caparao",
    name: "Pousada Casa do Lago Caparao",
    category: "Hospedagem",
    location: "Dores do Rio Preto - ES",
    shortLocation: "Caparao capixaba",
    mapsQuery: "Pousada Casa do Lago Caparao Dores do Rio Preto ES",
    description:
      "Hospedagem com estilo serrano e atmosfera de descanso, voltada para quem busca experiencia de montanha.",
    highlights: [
      "Visual de serra",
      "Ambiente acolhedor",
      "Contato com a natureza",
      "Descanso no roteiro",
      "Base para exploracao",
    ],
    accent: "sky",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "restaurante-rancho-do-caparao",
    name: "Restaurante Rancho do Caparao",
    category: "Gastronomia",
    location: "Alto Caparao - MG",
    shortLocation: "Caparao mineiro",
    mapsQuery: "Restaurante Rancho do Caparao Alto Caparao MG",
    description:
      "Restaurante regional com perfil rustico, indicado para refeicoes completas em roteiro de montanha.",
    highlights: [
      "Culinaria regional",
      "Ambiente rustico",
      "Parada para almoco",
      "Clima de serra",
      "Boa localizacao",
    ],
    accent: "gold",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "restaurante-vovo-niquinha",
    name: "Restaurante Vovo Niquinha",
    category: "Gastronomia",
    location: "Guacui - ES",
    shortLocation: "Caparao capixaba",
    mapsQuery: "Restaurante Vovo Niquinha Guacui ES",
    description:
      "Restaurante de comida caseira e ambiente acolhedor, conhecido como parada tradicional do roteiro.",
    highlights: [
      "Comida caseira",
      "Receitas regionais",
      "Ambiente acolhedor",
      "Atendimento atencioso",
      "Boa parada no roteiro",
    ],
    accent: "rust",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "toca-da-truta",
    name: "Toca da Truta",
    category: "Gastronomia",
    location: "Ibitirama - ES",
    shortLocation: "Entorno do parque",
    mapsQuery: "Toca da Truta Ibitirama ES",
    description:
      "Restaurante conhecido por pratos com truta e ambiente cercado por natureza na regiao do Caparao.",
    highlights: [
      "Pratos com truta",
      "Clima de serra",
      "Contato com a natureza",
      "Experiencia regional",
      "Parada de visitantes",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "restaurante-picanha-das-pedras",
    name: "Restaurante Picanha das Pedras",
    category: "Gastronomia",
    location: "Alto Caparao - MG",
    shortLocation: "Caparao mineiro",
    mapsQuery: "Restaurante Picanha das Pedras Alto Caparao MG",
    description:
      "Opcao gastronomica com foco em carnes e ambiente de serra, ideal para refeicao principal no roteiro.",
    highlights: [
      "Foco em carnes",
      "Ambiente amplo",
      "Parada para almoco",
      "Culinaria regional",
      "Boa estrutura",
    ],
    accent: "teal",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "estancia-gourmet",
    name: "Estancia Gourmet",
    category: "Gastronomia",
    location: "Alto Caparao - MG",
    shortLocation: "Caparao mineiro",
    mapsQuery: "Estancia Gourmet Alto Caparao MG",
    description:
      "Restaurante com proposta de experiencia gastronomica em ambiente sofisticado para o contexto da serra.",
    highlights: [
      "Experiencia gourmet",
      "Ambiente elegante",
      "Boa para jantar",
      "Roteiro gastronomico",
      "Servico diferenciado",
    ],
    accent: "indigo",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "destino-restaurante",
    name: "Destino Restaurante",
    category: "Gastronomia",
    location: "Alto Caparao - MG",
    shortLocation: "Caparao mineiro",
    mapsQuery: "Destino Restaurante Alto Caparao MG",
    description:
      "Restaurante com perfil urbano-serrano, indicado para quem quer refeicao completa em ponto central da regiao.",
    highlights: [
      "Boa localizacao",
      "Estrutura para turistas",
      "Parada estrategica",
      "Ambiente confortavel",
      "Cardapio variado",
    ],
    accent: "sky",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "parque-nacional-do-caparao",
    name: "Parque Nacional do Caparao",
    category: "Destino",
    location: "Divisa de Minas Gerais com Espirito Santo",
    shortLocation: "Area protegida de montanha",
    mapsQuery: "Parque Nacional do Caparao",
    description:
      "Parque com trilhas, cachoeiras e paisagens de serra, sendo uma das principais portas de experiencia natural do Caparao.",
    highlights: [
      "Trilhas de montanha",
      "Paisagem natural",
      "Roteiros de ecoturismo",
      "Area de preservacao",
      "Experiencia de natureza",
    ],
    accent: "indigo",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "alto-caparao",
    name: "Alto Caparao",
    category: "Destino",
    location: "Zona da Serra do Caparao - MG",
    shortLocation: "Cidade base do roteiro",
    mapsQuery: "Alto Caparao MG",
    description:
      "Cidade de montanha que funciona como base para explorar trilhas, cachoeiras e os principais atrativos do entorno.",
    highlights: [
      "Cidade de apoio ao turismo",
      "Clima serrano",
      "Acesso aos atrativos",
      "Boa infraestrutura regional",
      "Base para passeios",
    ],
    accent: "teal",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "pico-do-cristal",
    name: "Pico do Cristal",
    category: "Destino",
    location: "Parque Nacional do Caparao",
    shortLocation: "Altitude e trilha",
    mapsQuery: "Pico do Cristal Parque Nacional do Caparao",
    description:
      "Pico de altitude com trilha desafiadora e vistas panoramicas, indicado para roteiros de natureza e aventura.",
    highlights: [
      "Altitude elevada",
      "Trilha desafiadora",
      "Vista panoramica",
      "Ambiente de montanha",
      "Destino para aventureiros",
    ],
    accent: "sky",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "santuario-do-senhor-bom-jesus",
    name: "Santuario do Senhor Bom Jesus",
    category: "Destino",
    location: "Alto Caparao - MG",
    shortLocation: "Turismo historico e religioso",
    mapsQuery: "Santuario do Senhor Bom Jesus Alto Caparao MG",
    description:
      "Ponto de interesse historico e religioso que complementa o roteiro de natureza com experiencia cultural local.",
    highlights: [
      "Patrimonio religioso",
      "Valor historico",
      "Arquitetura tradicional",
      "Visita cultural",
      "Ponto urbano de roteiro",
    ],
    accent: "gold",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "cachoeira-da-fumaca",
    name: "Cachoeira da Fumaca",
    category: "Destino",
    location: "Ibitirama/Alegre - ES",
    shortLocation: "Queda dagua de destaque",
    mapsQuery: "Cachoeira da Fumaca Ibitirama Alegre ES",
    description:
      "Atrativo natural de agua corrente e paisagem verde, muito procurado para passeios de dia e contato direto com natureza.",
    highlights: [
      "Cachoeira de grande porte",
      "Paisagem verde",
      "Parada para passeio",
      "Roteiro de natureza",
      "Experiencia ao ar livre",
    ],
    accent: "forest",
    localCover: "",
    localGallery: [],
  },
  {
    slug: "pico-da-bandeira",
    name: "Pico da Bandeira",
    category: "Destino",
    location: "Dentro do Parque Nacional do Caparao",
    shortLocation: "Pico de alta altitude",
    mapsQuery: "Pico da Bandeira Parque Nacional do Caparao",
    description:
      "Pico de alta altitude muito buscado por trilheiros e aventureiros, com visual amplo da serra e experiencia marcante de montanha.",
    highlights: [
      "Alta altitude",
      "Trilha de aventura",
      "Nascer do sol famoso",
      "Vista panoramica",
      "Roteiro iconico da regiao",
    ],
    accent: "indigo",
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
    description: "Pousadas para descanso e experiencias de montanha.",
    count: places.filter((place) => place.category === "Hospedagem").length,
  },
  {
    title: "Gastronomia",
    description: "Paradas para comer bem com foco em culinaria regional.",
    count: places.filter((place) => place.category === "Gastronomia").length,
  },
  {
    title: "Destinos",
    description: "Locais de natureza e experiencias para montar o roteiro.",
    count: places.filter((place) => place.category === "Destino").length,
  },
];

export const featuredStats = [
  {
    value: String(places.filter((place) => place.imageSource === "repository").length),
    label: "lugares com foto do repositorio",
  },
  {
    value: String(places.filter((place) => place.imageSource === "maps").length),
    label: "lugares com galeria do Maps",
  },
  { value: String(places.length), label: "locais cadastrados" },
];
