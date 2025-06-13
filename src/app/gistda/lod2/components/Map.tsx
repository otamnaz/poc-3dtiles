"use client";

import React from "react";
import { Map } from "react-map-gl/maplibre";
import DeckGL from "@deck.gl/react";
import { Tile3DLayer } from "@deck.gl/geo-layers";
import type { MapViewState } from "@deck.gl/core";
import type { Tileset3D } from "@loaders.gl/tiles";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {}

const hexToRGB = (hexValue: string): [number, number, number] => {
  const numericValue = parseInt(hexValue, 16);
  const r = (numericValue >> 16) & 0xff;
  const g = (numericValue >> 8) & 0xff;
  const b = numericValue & 0xff;
  return [r, g, b];
};

const MapLibre: React.FC<Props> = (props) => {
  const [initialViewState, setInitialViewState] = React.useState<MapViewState>({
    longitude: 10,
    latitude: 50,
    zoom: 17,
  });

  const layer = new Tile3DLayer({
    id: "tile-3d-layer",
    data: "/gd-tiles/tileset.json",
    onTilesetLoad: (tileset: Tileset3D) => {
      // Recenter to cover the tileset
      const { cartographicCenter, zoom } = tileset;
      setInitialViewState({
        longitude: cartographicCenter!![0],
        latitude: cartographicCenter!![1],
        zoom,
      });
    },
  });

  return (
    <DeckGL initialViewState={initialViewState} controller layers={[layer]}>
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
