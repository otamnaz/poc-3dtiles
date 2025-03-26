"use client";

import React from "react";
import Map from "./components/Map";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MapPage() {
  const params = useSearchParams();

  const paramsPointSize = params.get("pointSize");
  const paramsWaterLevel = params.get("waterLevel");

  const defaultPointSize =
    paramsPointSize !== null ? parseInt(paramsPointSize) : 2;

  const waterLevel = paramsWaterLevel !== null ? parseInt(paramsWaterLevel) : 0;

  return <Map defaultPointSize={defaultPointSize} waterLevel={waterLevel} />;
}

export default function MapPageContainer() {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
}
