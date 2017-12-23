import React from 'react';
import PropTypes from 'prop-types';
import './BeatDot.css';

const BeatDot = ({isPlaying, isActive, icon}) => {
  let cssClass = 'Beat-Dot';
  if (isPlaying) {
    cssClass += ' playing';
  }
  if (isActive) {
    cssClass += ' active';
  }
  return (
    <div className={cssClass}>
      <img src={icon} alt="drum icon" />
    </div>
  );
};

BeatDot.propTypes = {
  isPlaying: PropTypes.bool,
  isActive: PropTypes.bool
};

export default BeatDot;
