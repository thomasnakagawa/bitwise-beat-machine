import React from 'react';
import PropTypes from 'prop-types';

const SettingsPanel = ({bpm, onBPMChange, onAddBit, onRemoveBit, canAddBit, canRemoveBit}) => (
  <div className="Settings-Panel">
    bpm
    <button onClick={() => {
      onBPMChange(100)
    }}>100</button>
    <button onClick={() => {
      onBPMChange(200)
    }}>200</button>

    <button
      disabled={!canAddBit}
      onClick={() => {
        onAddBit()
      }}
    >+</button>

    <button
      disabled={!canRemoveBit}
      onClick={() => {
        onRemoveBit()
      }}
    >-</button>
  </div>
);

SettingsPanel.propTypes = {
  bpm: PropTypes.number.isRequired,
  onBPMChange: PropTypes.func.isRequired,
  onAddBit: PropTypes.func.isRequired,
  onRemoveBit: PropTypes.func.isRequired,
  canAddBit: PropTypes.bool.isRequired,
  canRemoveBit: PropTypes.bool.isRequired
};

export default SettingsPanel;
