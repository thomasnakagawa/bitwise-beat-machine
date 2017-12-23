import React from 'react';
import PropTypes from 'prop-types';
import ByteInputRow from '../ByteInputRow/ByteInputRow';
import DrumTrack from '../DrumTrack/DrumTrack';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import Instrument from '../../util/instrumentUtil';
import Operator from '../../util/operatorUtil';

class DrumMachine extends React.Component {
  static propTypes = {
    byteA: PropTypes.string.isRequired,
    byteB: PropTypes.string.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    bpm: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeBitIndex: 0
    };

    this.setBeatTimer(props)
  }

  componentWillReceiveProps(nextProps) {
    // TODO: redirect to home if props are invalid

    if (nextProps.bpm !== this.props.bpm ||
      nextProps.byteA.length !== this.props.byteA.length ||
      nextProps.byteB.length !== this.props.byteB.length)
    {
      this.setBeatTimer(nextProps);
    }
  }

  setBeatTimer(props) {
    if (this.beatTimer !== null) {
      clearInterval(this.beatTimer);
    }
    this.beatTimer = setInterval(() => {
      this.setState({activeBitIndex: ((this.state.activeBitIndex + 1) % this.getNumberOfBits(props))});
    }, Math.floor(15000/props.bpm));
  }

  getNumberOfBits(props) {
    return Math.max(props.byteA.length, props.byteB.length);
  }

  handleBPMChange(newBPM) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    gameStateSegments[0] = newBPM;
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleAddTrack() {
    if (!this.canAddAnotherTrack()) {
      throw new Error("Cannot add another track");
    }
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    gameStateSegments.push(
      Instrument.nameToAcronym(Instrument.names[Math.floor(Math.random()*Instrument.names.length)]) + 
      Operator.nameToAcronym(Operator.names[Math.floor(Math.random()*Operator.names.length)]));
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleRemoveTrack(trackIndex) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    gameStateSegments.splice(3 + trackIndex, 1);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleBitClicked(byteIndex, bitIndex) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    const oldByte = gameStateSegments[1 + byteIndex];
    const newBit = (oldByte.charAt(bitIndex) === "0") ? "1" : "0";
    gameStateSegments[1 + byteIndex] = oldByte.substr(0, bitIndex) + newBit + oldByte.substr(bitIndex + 1);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleOperatorChange(trackIndex, newOperator) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    const oldTrack = gameStateSegments[3 + trackIndex];
    gameStateSegments[3 + trackIndex] = oldTrack[0] + Operator.nameToAcronym(newOperator);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleInstrumentChange(trackIndex, newInstrument) {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    const oldTrack = gameStateSegments[3 + trackIndex];
    gameStateSegments[3 + trackIndex] = Instrument.nameToAcronym(newInstrument) + oldTrack.substring(1);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleAddBit() {
    if (!this.canAddBit()) {
      throw new Error("Cannot add a bit");
    }
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    gameStateSegments[1] = gameStateSegments[1] + ["0", "1"][Math.floor(Math.random()*2)];
    gameStateSegments[2] = gameStateSegments[2] + ["0", "1"][Math.floor(Math.random()*2)];
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleRemoveBit() {
    if (!this.canRemoveBit()) {
      throw new Error("Cannot remove a bit");
    }
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    gameStateSegments[1] = gameStateSegments[1].slice(0, -1);
    gameStateSegments[2] = gameStateSegments[2].slice(0, -1);
    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  canAddAnotherTrack = () => this.props.tracks.length <= 16;
  canAddBit = () => this.getNumberOfBits(this.props) <= 64;
  canRemoveBit = () => this.getNumberOfBits(this.props) > 2;

  render() {
    return (
      <div className="Drum-Machine">
        <SettingsPanel
          bpm={this.props.bpm}
          onBPMChange={bpm => {
            this.handleBPMChange(bpm);
          }}
          onAddBit={() => {
            this.handleAddBit();
          }}
          onRemoveBit={() => {
            this.handleRemoveBit();
          }}
          canAddBit={this.canAddBit()}
          canRemoveBit={this.canRemoveBit()}
        />
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
            onRemoveTrack={() => {
              this.handleRemoveTrack(trackIndex);
            }}
          />
        )}
        <button
          disabled={this.canAddAnotherTrack() === false}
          onClick={() => {
            this.handleAddTrack();
          }}
        >Add track</button>
      </div>
    );
  }
}

export default DrumMachine;
