import React, { useEffect } from 'react';
import Panel from './Panel.js';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer,} from '@deck.gl/layers';
import GL from '@luma.gl/constants';
import { portLayer, routLayer } from '../services/layers.js';
import SearchPanel from './SearchPanel.js';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hpZG96aWUiLCJhIjoiY2tnOWgzNm92MDE3MDJ3cGc1amN5Yjc1bSJ9._rcv6x9fY7c9_tUNGLOdxg'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  latitude: 47.65,
  longitude: 7,
  zoom: 4.5,
  maxZoom: 16,
  pitch: 50,
  bearing: 0,

};

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

function getTooltip({ object }) {
  return (
    object &&
    `\
  ${object.country || object.abbrev || ''}
  ${object.name.indexOf('0x') >= 0 ? '' : object.name}`
  );
}

const getWidth = 3
const mapStyle = 'mapbox://styles/mapbox/light-v9'

export default function Map() {


  return (
   <div>
      <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      pickingRadius={5}
      parameters={{
        blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
        blendEquation: GL.FUNC_ADD
      }}
      getTooltip={getTooltip}
    >
      {/*  <Panel /> */}

      <StaticMap
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
     
     
    </DeckGL> 

    <SearchPanel />
   </div>


  );

}
