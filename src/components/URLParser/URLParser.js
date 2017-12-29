import React from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import Constants from '../../constants';
import Instrument from '../../util/instrumentUtil';
import Operator from '../../util/operatorUtil';

const URLParser = (props) => {
  const segments = props.match.params.trackState.split("-");

  let parseResult = null;
  try {
    parseResult = parseSements(segments); 
  }catch(e) {
    return (<Redirect to={Constants.DEFAULT_URL}/>);
  }

  const {byteA, byteB, tracks, bpm} = parseResult;

  return (
    <div className="parser">
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {...props, byteA, byteB, tracks, bpm})
      })}
    </div>
  );
};

const parseSements = segments => {  
  // must have at least a tempo, and two bytes
  if (segments.length < 3) {
    throw new Error("Not enough segments");
  }

  const bpm = parseInt(segments[0], 10);
  if (isNaN(bpm)) {
    throw new Error("BPM NaN");
  }

  const byteA = segments[1];
  const byteB = segments[2];

  if (byteA.length !== byteB.length ||
    /^[0, 1]+$/.test(byteA) === false ||
    /^[0, 1]+$/.test(byteB) === false ||
    byteA.length < Constants.MIN_BITS ||
    byteB.length < Constants.MIN_BITS ||
    byteA.length > Constants.MAX_BITS ||
    byteB.length > Constants.MAX_BITS)
  {
    throw new Error("Invalid bytes");
  }

  let tracks = [];

  const encodedTracks = _.drop(segments, 3);
  if (encodedTracks.length > Constants.MAX_TRACKS) {
    throw new Error("Too many tracks");
  }

  encodedTracks.forEach(trackData => {
    if (trackData.length !== 3) {
      throw new Error("Invalid track");
    }

    const instrument = Instrument.acronymToObject(trackData[0]);
    const operator = Operator.acronymToObject(trackData.substring(1));

    if (instrument === undefined || operator === undefined) {
      throw new Error("Track invalid attribute");
    }
    tracks.push({instrument, operator});
  });

  return {bpm, byteA, byteB, tracks};
}

export default URLParser;
