import React from 'react';
import PropTypes from 'prop-types';
import './ByteInputRow.css'

const ByteInputRow = ({label, byte, onBitClicked, bitPlaying}) => (
  <div className="Byte-Input-row">
    <div className="left-column">
    {label}
    </div>
    <div className="beat-grid">
    {byte.split("").map((bit, bitIndex) =>
      <BitButton
        key={bitIndex}
        onClick={() => {
          onBitClicked(bitIndex)
        }}
        isOn={bit === "1"}
        isPlaying={bitIndex === bitPlaying}
      />
    )}
    </div>
  </div>
);

ByteInputRow.propTypes = {
  label: PropTypes.string.isRequired,
  byte: PropTypes.string.isRequired,
  onBitClicked: PropTypes.func.isRequired,
  bitPlaying: PropTypes.number.isRequired
};

export default ByteInputRow;

const BitButton = ({onClick, isOn, isPlaying}) => (
  <div className={"onoffswitch"} onClick={onClick}>
      <label className={"onoffswitch-label" + (isOn ? "" : " off") + (isPlaying ? " playing" : "")} htmlFor="myonoffswitch">
          <span className={"onoffswitch-inner" + (isOn ? "" : " off") + (isPlaying ? " playing" : "")}></span>
      </label>
  </div>
)



