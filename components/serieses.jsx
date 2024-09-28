'use client';

import KidsSongs from './kidsSongs';
import NewSerieses from './newSerieses';
import ZomurodaPlanet from './zomurodaSerieses';
import AdventuresPlanet from './adventuresSerieses';
import SportPlanet from './sportSerieses';
import ActionPlanet from './actionSerieses';
import BonbonaPlanet from './bonbonaSerieses';
import Movies from './movies';
import ZomurodaPlanetMostViewed from './zomurodaSeriesesMostViewed';
import SportPlanetMostViewed from './sportSeriesesMostViewed';
import AdventuresPlanetMostViewed from './adventuresSeriesesMostViewed';
import ActionPlanetMostViewed from './actionSeriesesMostViewed';
import MoviesPlanetMostViewed from './moviesMostViewed';
import BonbonaPlanetMostViewed from './bonbonaSeriesesMostViewed';
import AdScript from './ads/ads';
import SpacetoonSongs from './spacetoonSongs';
export default function Serieses() {
  return (
    <div className="w-full">
      {/* <VideoPlayer /> */}
      <NewSerieses />
      {/* <div className="w-full h-72">
        <AdScript />
      </div> */}
      <ZomurodaPlanet />
      <ZomurodaPlanetMostViewed />
      <SpacetoonSongs />
      <AdventuresPlanet />
      <AdventuresPlanetMostViewed />
      <SportPlanet />
      <SportPlanetMostViewed />
      <ActionPlanet />
      <ActionPlanetMostViewed />
      <Movies />
      <MoviesPlanetMostViewed />
      <KidsSongs />
      <BonbonaPlanet />
      <BonbonaPlanetMostViewed />
    </div>
  );
}
