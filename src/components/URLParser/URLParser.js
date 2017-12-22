import React from 'react';
import _ from 'lodash';

const parseTrackData = trackData => ({
  instrument: trackData[0],
  operator: trackData.substring(1)
});

const URLParser = (props) => {
  const segments = props.match.params.trackState.split("-");
  const byteA = segments[0];
  const byteB = segments[1];

  let tracks = [];

  const encodedTracks = _.drop(segments, 2);
  encodedTracks.forEach(trackData => {
    tracks.push(parseTrackData(trackData));
  });

  return (
    <div>
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {...props, byteA, byteB, tracks})
      })}
    </div>
  );
};

export default URLParser;
