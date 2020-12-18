import DeckGL from '@deck.gl/react'; 
import {GeoJsonLayer, ScatterplotLayer} from '@deck.gl/layers';


function getColor(d) {
  const z = d.start[2];
  const r = z / 10000;

  return [255 * (1 - r * 2), 128 * r, 255 * r, 255 * (1 - r)];
}

function getSize(type) {
  if (type.search('major') >= 0) {
    return 100;
  }
  if (type.search('small') >= 0) {
    return 30;
  }
  return 60;
}

export const portLayer = (ports) => {
    return new ScatterplotLayer({
        id: 'ports',
        data: ports,
        radiusScale: 20,
        getPosition: d => d.coordinates,
        getFillColor: [255, 140, 0],
        getRadius: d => getSize(d.type),
        pickable: true
      })
}

export const routLayer = (stretches) => {
    return new GeoJsonLayer({
        id: 'geojson-layer',
        data: stretches,
        pickable: true,
        stroked: false,
        filled: true,
        extruded: true,
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: [160, 160, 180, 200],
        getLineColor: d => (d.properties.color),
        getRadius: 100,
        getLineWidth: 1,
        getElevation: 30
      });
}