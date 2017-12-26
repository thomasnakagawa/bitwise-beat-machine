import React from 'react';
import _ from 'lodash';

const parseTrackData = trackData => ({
  instrument: trackData[0],
  operator: trackData.substring(1)
});

const URLParser = (props) => {
  const segments = props.match.params.trackState.split("-");
  const bpm = parseInt(segments[0], 10)
  const byteA = segments[1];
  const byteB = segments[2];

  let tracks = [];

  const encodedTracks = _.drop(segments, 3);
  encodedTracks.forEach(trackData => {
    tracks.push(parseTrackData(trackData));
  });

  return (
    <div className="parser">
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {...props, byteA, byteB, tracks, bpm})
      })}
    </div>
  );
};

export default URLParser;
