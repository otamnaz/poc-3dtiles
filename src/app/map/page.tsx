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
    paramsPointSize !== null ? parseFloat(paramsPointSize) : 2.0;

  const waterLevel =
    paramsWaterLevel !== null ? parseFloat(paramsWaterLevel) : 0.0;

  return <Map defaultPointSize={defaultPointSize} waterLevel={waterLevel} />;
}

export default function MapPageContainer() {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
}
