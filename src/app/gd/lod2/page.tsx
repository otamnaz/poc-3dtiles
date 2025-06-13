"use client";

import React from "react";
import Map from "./components/Map";
import { Suspense } from "react";

function Lod2Page() {
  return <Map />;
}

export default function MapPageContainer() {
  return (
    <Suspense>
      <Lod2Page />
    </Suspense>
  );
}
