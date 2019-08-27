import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// @ts-ignore
import GeoloniaControl from "@geolonia/mbgl-geolonia-control";

export const Map: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef();

  useEffect(() => {
    if (!map) {
      const container = mapContainer.current;
      // @ts-ignore
      const map = new mapboxgl.Map({
        container,
        zoom: 3,
        center: [135, 35],
        hash: true,
        style:
          "https://api.geolonia.com/v1/styles/tilecloud-basic?key=YOUR-API-KEY"
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new GeoloniaControl());
      map.on("load", () => {
        map.addLayer({
          id: "mapwarper",
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "https://mapwarper.h-gis.jp/maps/tile/3866/{z}/{x}/{y}.png"
            ],
            tileSize: 356
          }
        });
      });
      setMap(map);
    }
  }, [map]);

  return (
    <div
      // @ts-ignore
      ref={mapContainer}
      style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Map;
