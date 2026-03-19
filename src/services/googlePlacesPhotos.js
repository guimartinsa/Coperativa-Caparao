const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();

const SEARCH_ENDPOINT = "https://places.googleapis.com/v1/places:searchText";
const PLACE_PHOTO_ENDPOINT = "https://places.googleapis.com/v1";

const photosCache = new Map();
const inflightCache = new Map();

export const hasGooglePlacesPhotoAccess = Boolean(googleMapsApiKey);

const buildPhotoMediaUrl = (photoName, maxWidthPx = 1400) => {
  if (!googleMapsApiKey || !photoName) {
    return "";
  }

  return `${PLACE_PHOTO_ENDPOINT}/${photoName}/media?maxWidthPx=${maxWidthPx}&key=${encodeURIComponent(googleMapsApiKey)}`;
};

const createCacheKey = (query, limit) => `${query}::${limit}`;

async function fetchPlacePhotoUrls(query, limit) {
  if (!googleMapsApiKey || !query) {
    return [];
  }

  const response = await fetch(SEARCH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": googleMapsApiKey,
      "X-Goog-FieldMask": "places.photos,places.displayName",
    },
    body: JSON.stringify({
      textQuery: query,
      pageSize: 1,
      languageCode: "pt-BR",
    }),
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const photos = data?.places?.[0]?.photos || [];

  return photos
    .slice(0, limit)
    .map((photo) => buildPhotoMediaUrl(photo.name))
    .filter(Boolean);
}

export async function getPlacePhotoUrls(query, limit = 6) {
  const cacheKey = createCacheKey(query, limit);

  if (photosCache.has(cacheKey)) {
    return photosCache.get(cacheKey);
  }

  if (inflightCache.has(cacheKey)) {
    return inflightCache.get(cacheKey);
  }

  const requestPromise = fetchPlacePhotoUrls(query, limit)
    .then((photos) => {
      photosCache.set(cacheKey, photos);
      inflightCache.delete(cacheKey);
      return photos;
    })
    .catch(() => {
      inflightCache.delete(cacheKey);
      photosCache.set(cacheKey, []);
      return [];
    });

  inflightCache.set(cacheKey, requestPromise);
  return requestPromise;
}
