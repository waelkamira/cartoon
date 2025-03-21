'use client';

import KidsSongs from './kidsSongs';
import KidsSongsMostView from './kidsSongsMostView';
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
import SpacetoonSongs from './spacetoonSongs';
import SpacetoonSongsMostView from './spacetoonSongsMostView';
import NasohSeries from './nasohSeries';
import PlanetSlider from './ReuseableComponents/PlanetSlider';
export default function Serieses() {
  return (
    <div className="w-full">
      <NewSerieses />

      <PlanetSlider
        data="زمردة"
        category="series"
        logoSrc="https://i.imgur.com/wbjwdXO.png"
      />

      <ZomurodaPlanetMostViewed />
      {/* <NasohSeries /> */}
      <PlanetSlider
        planetName="مغامرات"
        category="series"
        logoSrc="https://i.imgur.com/sUeBEaz.png"
      />
      <PlanetSlider
        planetName="عائلة نصوح"
        category="series"
        logoSrc="https://i.imgur.com/u6grI22.png"
      />
      <AdventuresPlanetMostViewed />
      <PlanetSlider
        planetName="رياضة"
        category="series"
        logoSrc="https://i.imgur.com/CI7HaVo.png"
      />
      {/* <SportPlanet /> */}
      <SportPlanetMostViewed />
      <PlanetSlider
        planetName="أكشن"
        category="series"
        logoSrc="https://i.imgur.com/bg5hr5i.png"
      />

      {/* <ActionPlanet /> */}
      <ActionPlanetMostViewed />
      {/* <Movies /> */}

      <PlanetSlider
        category="movie"
        logoSrc="https://i.imgur.com/QBreMYl.png"
      />
      <MoviesPlanetMostViewed />
      <PlanetSlider
        planetName="الصيصان"
        category="series"
        logoSrc="https://i.imgur.com/DnKrRt2.png"
      />
      {/* <BonbonaPlanet /> */}
      <BonbonaPlanetMostViewed />
      <PlanetSlider
        planetName="أغاني سبيس تون"
        category="spacetoonSongs"
        logoSrc="https://i.imgur.com/BWPdDAF.png"
      />
      {/* <SpacetoonSongs /> */}
      <SpacetoonSongsMostView />
      <PlanetSlider
        planetName="أغاني  أطفال"
        category="KidsSongs"
        logoSrc="https://i.imgur.com/rRBpVhp.png"
      />
      {/* <KidsSongs /> */}
      <KidsSongsMostView />
    </div>
  );
}
