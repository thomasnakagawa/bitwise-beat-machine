import React from 'react';
import PropTypes from 'prop-types';
import './BeatDot.css';

const BeatDot = ({isPlaying, isActive}) => {
  let cssClass = 'Beat-Dot';
  if (isPlaying) {
    cssClass += ' playing';
  }
  if (isActive) {
    cssClass += ' active';
  }
  return (
    <div className={cssClass}/>
  );
};

BeatDot.propTypes = {
  isPlaying: PropTypes.bool,
  isActive: PropTypes.bool
};

export default BeatDot;
