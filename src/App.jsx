import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { categories, featuredStats, places } from "./data/places";

const features = [
  {
    title: "Curadoria regional",
    description:
      "Os conteudos foram adaptados para o Caparao, com foco em pousadas, gastronomia e experiencias locais.",
  },
  {
    title: "Paginas individuais",
    description:
      "Cada lugar ganhou uma pagina propria com descricao, destaques e mapa ja carregado dentro da propria tela.",
  },
  {
    title: "Visual inspirado no layout de viagem",
    description:
      "A landing mantem a linguagem de turismo do design de referencia, mas com conteudo real da cooperativa.",
  },
  {
    title: "Base pronta para crescer",
    description:
      "A estrutura em React permite incluir novas paginas, imagens e filtros sem refazer o projeto do zero.",
  },
];

const groupedSections = [
  {
    id: "hospedagens",
    eyebrow: "Hospedagens",
    title: "Pousadas e refugios para descansar com vista de serra",
    categories: ["Hospedagem"],
  },
  {
    id: "gastronomia",
    eyebrow: "Gastronomia",
    title: "Paradas para comer bem e valorizar sabores regionais",
    categories: ["Gastronomia"],
  },
  {
    id: "destinos",
    eyebrow: "Destinos e natureza",
    title: "Cidades e paisagens para montar o roteiro completo",
    categories: ["Destino", "Natureza"],
  },
];

const itineraryCards = [
  {
    title: "Fim de semana com serra e pousada",
    description:
      "Chegada em Pedra Menina, descanso em pousada e jantar com clima acolhedor para comecar a viagem leve.",
  },
  {
    title: "Dia de sabores regionais",
    description:
      "Combine a comida caseira do Vovo Niquinha com uma visita ao Toca da Truta entre os atrativos do parque.",
  },
  {
    title: "Roteiro para altitude",
    description:
      "Use Alto Caparao como base e siga para trilhas, cachoeiras e a subida rumo ao Pico do Cristal.",
  },
];

const navSections = [
  { id: "hospedagens", label: "Hospedagens" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "destinos", label: "Destinos" },
];

const appBase = import.meta.env.BASE_URL || "/";
const homeSectionHref = (id) => `${appBase}#${id}`;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lugares/:slug" element={<PlacePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function HomePage() {
  const heroImage = places[0].coverImage;

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10, 24, 29, 0.1) 0%, rgba(10, 24, 29, 0.78) 100%), url(${heroImage})`,
          }}
        >
          <a className="hero-click-layer" href="#hospedagens" aria-label="Ir para hospedagens" />
          <div className="container hero-inner">
            <span className="hero-kicker">Cooperativa Caparao</span>
            <h1>Clique no banner e descubra os lugares separados por categoria.</h1>
            <p>
              A navegacao esta organizada por blocos de hospedagem, gastronomia e destinos,
              priorizando fotos locais quando existirem e usando galeria do Maps nos demais.
            </p>

            <div className="search-card">
              <div className="search-field">
                <span>Onde ficar</span>
                <strong>Pedra Menina, Patrimonio e Alto Caparao</strong>
              </div>
              <div className="search-field">
                <span>O que explorar</span>
                <strong>Pousadas, restaurantes e natureza</strong>
              </div>
              <div className="search-field">
                <span>Estilo da viagem</span>
                <strong>Descanso, gastronomia e trilhas</strong>
              </div>
            </div>
            <span className="hero-hint">Clique em qualquer area do banner para ir direto as categorias.</span>

            <div className="hero-stats">
              {featuredStats.map((item) => (
                <article key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quick-nav container" aria-label="Navegacao rapida por categorias">
          {navSections.map((item) => (
            <a key={item.id} className="quick-nav-chip" href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </section>

        <section className="section container">
          <SectionHeading
            eyebrow="Por que esse projeto"
            title="Uma base pronta para apresentar o Caparao com mais impacto"
          />
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <span className="feature-badge" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-soft" id="categorias">
          <div className="container">
            <SectionHeading
              eyebrow="Categorias"
              title="A estrutura da home foi separada para facilitar a navegacao"
            />
            <div className="category-grid">
              {categories.map((category) => (
                <article key={category.title} className="category-card">
                  <span>{String(category.count).padStart(2, "0")} opcoes</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {groupedSections.map((group) => (
          <section className="section container" id={group.id} key={group.id}>
            <SectionHeading
              eyebrow={group.eyebrow}
              title={group.title}
              actionLabel={group.id === "destinos" ? "Voltar ao topo" : undefined}
              actionHref={group.id === "destinos" ? "#topo" : undefined}
            />
            <div className="place-grid">
              {places
                .filter((place) => group.categories.includes(place.category))
                .map((place) => (
                  <PlaceCard key={place.slug} place={place} />
                ))}
            </div>
          </section>
        ))}

        <section className="section section-dark">
          <div className="container testimonial-shell">
            <div>
              <span className="section-label light">Roteiros sugeridos</span>
              <h2>Monte uma jornada leve, gastronomica ou de aventura sem perder a identidade local.</h2>
            </div>
            <div className="itinerary-grid">
              {itineraryCards.map((card) => (
                <article key={card.title} className="itinerary-card">
                  <span className="itinerary-mark" />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PlacePage() {
  const { slug } = useParams();
  const place = places.find((item) => item.slug === slug);

  if (!place) {
    return <NotFoundPage />;
  }

  const relatedPlaces = places.filter((item) => item.slug !== slug).slice(0, 3);
  const galleryEyebrow =
    place.imageSource === "repository" ? "Fotos do repositorio" : "Galeria do Google Maps";
  const galleryTitle =
    place.imageSource === "repository"
      ? "Imagens locais priorizadas para este lugar"
      : "Imagens buscadas na galeria do local no Maps";
  const heroStyle = place.coverImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(9, 22, 26, 0.16) 0%, rgba(9, 22, 26, 0.86) 100%), url(${place.coverImage})`,
      }
    : {};

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className={`detail-hero accent-${place.accent}`} style={heroStyle}>
          <div className="container detail-hero-inner">
            <Link className="back-link" to="/">
              Voltar para a landing
            </Link>
            <span className="detail-tag">{place.category}</span>
            <h1>{place.name}</h1>
            <p>{place.description}</p>
            <div className="detail-actions">
              <a className="primary-button" href={place.mapsUrl} target="_blank" rel="noreferrer">
                Abrir no Google Maps
              </a>
              <span className="detail-location">{place.location}</span>
            </div>
          </div>
        </section>

        <section className="section container detail-layout">
          <div className="detail-content">
            <article className="content-block">
              <SectionHeading eyebrow="Mapa carregado" title="Localizacao visivel nesta pagina" />
              <div className="map-frame-shell">
                <iframe
                  className="map-frame"
                  src={place.embedMapUrl}
                  title={`Mapa de ${place.name}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>

            <article className="content-block">
              <SectionHeading eyebrow="Visao geral" title="O que faz esse lugar entrar no roteiro" />
              <p className="long-text">{place.description}</p>
            </article>

            <article className="content-block">
              <SectionHeading eyebrow="Destaques" title="Pontos principais da experiencia" />
              <div className="highlight-grid">
                {place.highlights.map((highlight) => (
                  <div key={highlight} className="highlight-pill">
                    {highlight}
                  </div>
                ))}
              </div>
            </article>

            <article className="content-block">
              <SectionHeading eyebrow={galleryEyebrow} title={galleryTitle} />
              <div className="gallery-grid">
                {place.gallery.map((image, index) => (
                  <MapPreviewImage
                    key={image}
                    className={index === 0 ? "gallery-image gallery-image-wide" : "gallery-image"}
                    src={image}
                    alt={`${place.name} - mapa ${index + 1}`}
                    accent={place.accent}
                  />
                ))}
              </div>
            </article>
          </div>

          <aside className="detail-sidebar">
            <article className="sidebar-card">
              <span className="sidebar-label">Localizacao</span>
              <h3>{place.location}</h3>
              <p>O mapa ja esta carregado na pagina e voce tambem pode abrir no Google Maps.</p>
              <a className="secondary-button" href={place.mapsUrl} target="_blank" rel="noreferrer">
                Ver rota no Maps
              </a>
            </article>

            <article className="sidebar-card">
              <span className="sidebar-label">Categoria</span>
              <h3>{place.category}</h3>
              <p>{place.shortLocation}</p>
            </article>
          </aside>
        </section>

        <section className="section section-soft">
          <div className="container">
            <SectionHeading eyebrow="Continue navegando" title="Outros lugares para encaixar no mesmo roteiro" />
            <div className="place-grid compact">
              {relatedPlaces.map((item) => (
                <PlaceCard key={item.slug} place={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PlaceCard({ place }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="place-card">
      {!imageFailed && place.coverImage ? (
        <img
          className="place-card-image"
          src={place.coverImage}
          alt={`Mapa de ${place.name}`}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className={`place-card-image place-card-image-fallback accent-${place.accent}`}>
          <span>{place.category}</span>
          <strong>{place.shortLocation}</strong>
        </div>
      )}
      <div className="place-card-body">
        <span className="place-card-meta">
          {place.category} · {place.location}
        </span>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <div className="place-card-actions">
          <Link className="text-link" to={`/lugares/${place.slug}`}>
            Ver pagina
          </Link>
          <a href={place.mapsUrl} target="_blank" rel="noreferrer">
            Mapa
          </a>
        </div>
      </div>
    </article>
  );
}

function MapPreviewImage({ src, alt, className, accent }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className={`${className} gallery-fallback accent-${accent}`}>
        <span>Previa de imagem indisponivel</span>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} onError={() => setImageFailed(true)} />;
}

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionHref = (id) => (location.pathname === "/" ? `#${id}` : homeSectionHref(id));

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="site-header" id="topo">
      <div className="container header-shell">
        <div className="topbar-main">
          <Link className="brand" to="/">
            <span className="brand-overline">Cooperativa Caparao</span>
            <strong>Roteiro Caparao</strong>
          </Link>
          <div className="topbar-actions">
            <a
              className="topbar-cta"
              href="https://www.google.com/maps/search/?api=1&query=Capara%C3%B3"
              target="_blank"
              rel="noreferrer"
            >
              Mapa da regiao
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? "Fechar" : "Menu"}
            </button>
          </div>
        </div>

        <nav className="site-nav desktop-nav" aria-label="Navegacao principal">
          {navSections.map((item) => (
            <a key={item.id} className="nav-chip" href={sectionHref(item.id)}>
              {item.label}
            </a>
          ))}
          <NavLink className="nav-chip nav-chip-highlight" to="/lugares/alto-caparao">
            Destino base
          </NavLink>
        </nav>

        <nav className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`} aria-label="Menu mobile">
          {navSections.map((item) => (
            <a key={item.id} className="mobile-menu-link" href={sectionHref(item.id)}>
              {item.label}
            </a>
          ))}
          <NavLink className="mobile-menu-link mobile-menu-link-highlight" to="/lugares/alto-caparao">
            Destino base
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <span className="section-label light">Cooperativa Caparao</span>
          <h2>Categorias separadas, banner clicavel e mapa visivel em todas as paginas.</h2>
        </div>
        <div className="footer-links">
          <a href={homeSectionHref("hospedagens")}>Explorar categorias</a>
          <a href="https://www.google.com/maps/search/?api=1&query=Capara%C3%B3" target="_blank" rel="noreferrer">
            Abrir regiao no Maps
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, actionLabel, actionHref }) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-label">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {actionLabel && actionHref ? (
        <a className="section-action" href={actionHref}>
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="not-found">
        <div className="container not-found-card">
          <span className="section-label">Pagina nao encontrada</span>
          <h1>Esse destino ainda nao foi cadastrado.</h1>
          <p>Volte para a pagina inicial para explorar os roteiros ja montados.</p>
          <Link className="primary-button" to="/">
            Ir para a home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
