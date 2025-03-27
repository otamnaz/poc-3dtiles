"use client";

import React from "react";
import Map from "./components/Map";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MapPage() {
  const params = useSearchParams();

  const paramsPointSize = params.get("pointSize");
  const paramsWaterLevel = params.get("waterLevel");
  const paramsWaterOpacity = params.get("waterOpacity");
  const paramsWaterColor = params.get("waterColor");

  const defaultPointSize =
    paramsPointSize !== null ? parseFloat(paramsPointSize) : 2.0;

  const waterLevel =
    paramsWaterLevel !== null ? parseFloat(paramsWaterLevel) : 0.0;

  const waterOpacity =
    paramsWaterOpacity !== null ? parseFloat(paramsWaterOpacity) : 0.6;

  const waterColor = paramsWaterColor ?? "59d2fe";

  return (
    <Map
      defaultPointSize={defaultPointSize}
      waterLevel={waterLevel}
      waterOpacity={waterOpacity}
      waterColor={waterColor}
    />
  );
}

export default function MapPageContainer() {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
}
