"use client";

import React from "react";
import { Map } from "react-map-gl/maplibre";
import DeckGL from "@deck.gl/react";
import { Tile3DLayer } from "@deck.gl/geo-layers";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";
import type { MapViewState } from "@deck.gl/core";
import type { Tileset3D } from "@loaders.gl/tiles";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {}

const MapLibre: React.FC<Props> = (_) => {
  const [initialViewState, setInitialViewState] = React.useState<MapViewState>({
    longitude: 10,
    latitude: 50,
    zoom: 2,
  });

  // const layer =  new Tile3DLayer({
  //     id: "tile-3d-layer",
  //     // Tileset json file url
  //     data: "https://assets.cesium.com/3252714/tileset.json",
  //     loader: CesiumIonLoader,
  //     loadOptions: {
  //       // Set up Ion account: https://cesium.com/docs/tutorials/getting-started/#your-first-app
  //       "cesium-ion": {
  //         accessToken:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZGI1YWY3ZS02YTlhLTQxMTMtYTVjOS02NmFjMjc3MTUzNjgiLCJpZCI6Mjg3MjIwLCJpYXQiOjE3NDI4MzMzNzN9.Bi27tVPhyxk7pWOtb2zvdrNqwmjhXp8wcoykSkKvos8",
  //       },
  //     },
  //     onTilesetLoad: (tileset: Tileset3D) => {
  //       // Recenter to cover the tileset
  //       const { cartographicCenter, zoom } = tileset;
  //       setInitialViewState({
  //         longitude: cartographicCenter[0],
  //         latitude: cartographicCenter[1],
  //         zoom,
  //       });
  //     },
  //     pointSize: 2,
  //   });

  const layer = new Tile3DLayer({
    data: "/cesium-tiles/tileset.json",
    loaders: [Tiles3DLoader],
    onTilesetLoad: (tileset: Tileset3D) => {
      // Recenter to cover the tileset
      const { cartographicCenter, zoom } = tileset;
      if (cartographicCenter) {
        setInitialViewState({
          longitude: cartographicCenter[0],
          latitude: cartographicCenter[1],
          zoom,
        });
      }
    },
    pointSize: 2,
  });

  return (
    <DeckGL initialViewState={initialViewState} controller layers={[layer]}>
      {/* <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" /> */}
      <Map
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap Contributors",
              maxzoom: 19,
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
            },
          ],
          sky: {},
        }}
      />
    </DeckGL>
  );
};

export default MapLibre;
