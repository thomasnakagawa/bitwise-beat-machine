import React from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import BeatDot from '../BeatDot/BeatDot';
import Operator from '../../util/operatorUtil';
import Instrument from '../../util/instrumentUtil';
import './DrumTrack.css';

class DrumTrack extends React.Component {
  static propTypes = {
    instrument: PropTypes.object.isRequired,
    operator: PropTypes.object.isRequired,
    inputA: PropTypes.string.isRequired,
    inputB: PropTypes.string.isRequired,
    activeBitIndex: PropTypes.number.isRequired,
    onOperationSelect: PropTypes.func.isRequired,
    onInstrumentSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      lastTriggeredSoundAtIndex: -1
    };
    this.soundPlayer = new Howl({src: [props.instrument.soundFile]})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBitIndex !== this.state.lastTriggeredSoundAtIndex) {
      if (this.isBitOn(nextProps.activeBitIndex)) {
        this.soundPlayer.play();
      }
      this.setState({lastTriggeredSoundAtIndex: nextProps.activeBitIndex});
    }

    if (nextProps.instrument.soundFile !== this.props.instrument.soundFile) {
      this.soundPlayer = new Howl({src: [nextProps.soundFile]})
    }
  }

  isBitOn(bitIndex) {
    const valA = this.props.inputA[bitIndex] === "1";
    const valB = this.props.inputB[bitIndex] === "1";
    return this.props.operator.method(valA, valB);
  }

  render() {
    return (
      <div className="Drum-Track">
        <div className="left-column">
          <select value={this.props.instrument.name} onChange={event => {
            this.props.onInstrumentSelect(event.target.value);
          }}>
            {Instrument.names.map((instrumentName, instrumentIndex) => 
              <option key={instrumentIndex} value={instrumentName}>{instrumentName}</option>
            )}
          </select>
          A
          <select value={this.props.operator.name} onChange={event => {
            this.props.onOperationSelect(event.target.value);
          }}>
            {Operator.names.map((operatorName, opIndex) => 
              <option key={opIndex} value={operatorName}>{operatorName}</option>
            )}
          </select>
          B
        </div>
        <div className="beat-grid">
          {this.props.inputA.split("").map((bit, bitIndex) => 
            <BeatDot
              key={bitIndex}
              isPlaying={bitIndex === this.props.activeBitIndex}
              isActive={this.isBitOn(bitIndex)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default DrumTrack;
