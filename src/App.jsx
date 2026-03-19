import { useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { categories, featuredStats, places } from "./data/places";

const features = [
  {
    title: "Curadoria regional",
    description:
      "Os conteúdos foram adaptados para o Caparaó, com foco em pousadas, gastronomia e experiências locais.",
  },
  {
    title: "Páginas individuais",
    description:
      "Cada lugar ganhou uma página própria com descrição, destaques e mapa já carregado dentro da própria tela.",
  },
  {
    title: "Visual inspirado no layout de viagem",
    description:
      "A landing mantém a linguagem de turismo do design de referência, mas com conteúdo real da cooperativa.",
  },
  {
    title: "Base pronta para crescer",
    description:
      "A estrutura em React permite incluir novas páginas, imagens e filtros sem refazer o projeto do zero.",
  },
];

const groupedSections = [
  {
    id: "hospedagens",
    eyebrow: "Hospedagens",
    title: "Pousadas e refúgios para descansar com vista de serra",
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
      "Chegada em Pedra Menina, descanso em pousada e jantar com clima acolhedor para começar a viagem leve.",
  },
  {
    title: "Dia de sabores regionais",
    description:
      "Combine a comida caseira do Vovó Niquinha com uma visita ao Toca da Truta entre os atrativos do parque.",
  },
  {
    title: "Roteiro para altitude",
    description:
      "Use Alto Caparaó como base e siga para trilhas, cachoeiras e a subida rumo ao Pico do Cristal.",
  },
];

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
            <span className="hero-kicker">Cooperativa Caparaó</span>
            <h1>Clique no banner e descubra os lugares separados por categoria.</h1>
            <p>
              A navegação agora está organizada por blocos de hospedagem, gastronomia e destinos,
              com imagens do Google Maps para todos os lugares.
            </p>

            <div className="search-card">
              <div className="search-field">
                <span>Onde ficar</span>
                <strong>Pedra Menina, Patrimônio e Alto Caparaó</strong>
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
            <span className="hero-hint">Clique em qualquer área do banner para ir direto às categorias.</span>

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

        <section className="section container">
          <SectionHeading
            eyebrow="Por que esse projeto"
            title="Uma base pronta para apresentar o Caparaó com mais impacto"
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
              title="A estrutura da home foi separada para facilitar a navegação"
            />
            <div className="category-grid">
              {categories.map((category) => (
                <article key={category.title} className="category-card">
                  <span>{String(category.count).padStart(2, "0")} opções</span>
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
              <h2>Monte uma jornada leve, gastronômica ou de aventura sem perder a identidade local.</h2>
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
              <SectionHeading eyebrow="Mapa carregado" title="Localização visível nesta página" />
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
              <SectionHeading eyebrow="Visão geral" title="O que faz esse lugar entrar no roteiro" />
              <p className="long-text">{place.description}</p>
            </article>

            <article className="content-block">
              <SectionHeading eyebrow="Destaques" title="Pontos principais da experiência" />
              <div className="highlight-grid">
                {place.highlights.map((highlight) => (
                  <div key={highlight} className="highlight-pill">
                    {highlight}
                  </div>
                ))}
              </div>
            </article>

            <article className="content-block">
              <SectionHeading eyebrow="Imagens do Google Maps" title="Prévia visual do entorno e acesso" />
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
              <span className="sidebar-label">Localização</span>
              <h3>{place.location}</h3>
              <p>O mapa já está carregado na página e você também pode abrir no Google Maps.</p>
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
            Ver página
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
        <span>Prévia do Maps indisponível</span>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} onError={() => setImageFailed(true)} />;
}

function Header() {
  return (
    <header className="site-header" id="topo">
      <div className="container header-inner">
        <Link className="brand" to="/">
          Cooperativa Caparaó
        </Link>
        <nav className="site-nav">
          <a href="/#hospedagens">Hospedagens</a>
          <a href="/#gastronomia">Gastronomia</a>
          <a href="/#destinos">Destinos</a>
          <NavLink to="/lugares/alto-caparao">Destino base</NavLink>
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
          <span className="section-label light">Cooperativa Caparaó</span>
          <h2>Categorias separadas, banner clicável e mapa visível em todas as páginas.</h2>
        </div>
        <div className="footer-links">
          <a href="/#hospedagens">Explorar categorias</a>
          <a href="https://www.google.com/maps/search/?api=1&query=Capara%C3%B3" target="_blank" rel="noreferrer">
            Abrir região no Maps
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
          <span className="section-label">Página não encontrada</span>
          <h1>Esse destino ainda não foi cadastrado.</h1>
          <p>Volte para a página inicial para explorar os roteiros já montados.</p>
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
