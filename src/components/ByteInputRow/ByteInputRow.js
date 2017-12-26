import React from 'react';
import PropTypes from 'prop-types';

const ByteInputRow = ({label, byte, onBitClicked}) => (
  <div className="Byte-Input-row">
    <div className="left-column">
    {label}
    </div>
    <div className="beat-grid">
    {byte.split("").map((bit, bitIndex) =>
      <button
        key={bitIndex}
        onClick={() => {
          onBitClicked(bitIndex)
        }}
      >
        {bit}
      </button>
    )}
    </div>
  </div>
);

ByteInputRow.propTypes = {
  label: PropTypes.string.isRequired,
  byte: PropTypes.string.isRequired,
  onBitClicked: PropTypes.func.isRequired
};

export default ByteInputRow;
