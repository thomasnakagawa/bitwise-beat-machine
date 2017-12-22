import React from 'react';
import PropTypes from 'prop-types';

const ByteInputRow = ({label, byte, onBitClicked}) => (
  <div className="Byte-Input-row">
    {label}
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
);

ByteInputRow.propTypes = {
  label: PropTypes.string.isRequired,
  byte: PropTypes.string.isRequired,
  onBitClicked: PropTypes.func.isRequired
};

export default ByteInputRow;
