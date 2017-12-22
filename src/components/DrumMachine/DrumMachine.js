import React from 'react';
import PropTypes from 'prop-types';
import ByteInputRow from '../../components/ByteInputRow/ByteInputRow';
import DrumTrack from '../../components/DrumTrack/DrumTrack';
import Instrument from '../../util/instrumentUtil';
import Operator from '../../util/operatorUtil';

class DrumMachine extends React.Component {
  static propTypes = {
    byteA: PropTypes.string.isRequired,
    byteB: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeBitIndex: 0
    };

    this.setBeatTimer(props)
  }

  componentWillReceiveProps(props) {
    // redirect to home if props are invalid
    // reset timer if bpm change
  }

  setBeatTimer(props) {
    const numberOfBits = props.byteA.length;
    setInterval(() => {
      this.setState({activeBitIndex: ((this.state.activeBitIndex + 1) % numberOfBits)});
    }, 100);
  }

  handleBitClicked(byteIndex, bitIndex) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    const oldByte = gameStateSegments[byteIndex];
    const newBit = (oldByte.charAt(bitIndex) === "0") ? "1" : "0";
    gameStateSegments[byteIndex] = oldByte.substr(0, bitIndex) + newBit + oldByte.substr(bitIndex + 1);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleOperatorChange(trackIndex, newOperator) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    const oldTrack = gameStateSegments[2 + trackIndex];
    gameStateSegments[2 + trackIndex] = oldTrack[0] + Operator.nameToAcronym(newOperator);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleInstrumentChange(trackIndex, newInstrument) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    const oldTrack = gameStateSegments[2 + trackIndex];
    gameStateSegments[2 + trackIndex] = Instrument.nameToAcronym(newInstrument) + oldTrack.substring(1);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  render() {
    return (
      <div className="Drum-Machine">
        <ByteInputRow
          label="A"
          byte={this.props.byteA}
          onBitClicked={bitIndex => {
            this.handleBitClicked(0, bitIndex)
          }}
        />
        <ByteInputRow
          label="B"
          byte={this.props.byteB}
          onBitClicked={bitIndex => {
            this.handleBitClicked(1, bitIndex)
          }}
        />
        {this.props.tracks.map((track, trackIndex) => 
          <DrumTrack
            key={trackIndex}
            operator={Operator.acronymToObject(track.operator)}
            instrument={Instrument.acronymToObject(track.instrument)}
            inputA={this.props.byteA}
            inputB={this.props.byteB}
            activeBitIndex={this.state.activeBitIndex}
            onOperationSelect={newOperator => {
              this.handleOperatorChange(trackIndex, newOperator);
            }}
            onInstrumentSelect={newInstrument => {
              this.handleInstrumentChange(trackIndex, newInstrument);
            }}
          />
        )}
      </div>
    );
  }
}

export default DrumMachine;
