const API_KEY = 'AIzaSyDqJtH6hpF1i1ct9qHzKsqHh4wzMwZTzfw';

export class GooglePlacesService {
  static async fetchNearbyMarkets(latitude, longitude, radius = 5000) {
    const keywords = ['marché', 'market', 'bazaar', 'supermarché', 'épicerie'];
    let allResults = [];

    try {
      for (const keyword of keywords) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
          allResults = allResults.concat(data.results);
        }
      }

      // Supprimer les doublons
      const uniqueMarkets = this.removeDuplicates(allResults);
      return uniqueMarkets;
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des marchés : ${error.message}`,
      );
    }
  }

  static removeDuplicates(markets) {
    const seen = new Set();
    return markets.filter(market => {
      if (!seen.has(market.place_id)) {
        seen.add(market.place_id);
        return true;
      }
      return false;
    });
  }

  static getPhotoUrl(market, maxWidth = 400) {
    if (market?.photos?.length > 0) {
      const photoReference = market.photos[0].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${API_KEY}`;
    }
    return null;
  }

  static async getPlaceDetails(placeId) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,opening_hours,website&key=${API_KEY}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des détails : ${error.message}`,
      );
    }
  }
}
