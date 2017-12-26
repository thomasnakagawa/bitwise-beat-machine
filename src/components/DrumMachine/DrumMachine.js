import React from 'react';
import PropTypes from 'prop-types';
import ByteInputRow from '../ByteInputRow/ByteInputRow';
import DrumTrack from '../DrumTrack/DrumTrack';
import {PlaybackSettings, TempoSettings, BitSettings, TrackSettings} from '../SettingsPanel/SettingsPanel';
import Instrument from '../../util/instrumentUtil';
import Operator from '../../util/operatorUtil';
import './DrumMachine.css';

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
      activeBitIndex: -1,
    };

    this.setBeatTimer(props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.beatTimer != null && (
      nextProps.bpm !== this.props.bpm ||
      nextProps.byteA.length !== this.props.byteA.length ||
      nextProps.byteB.length !== this.props.byteB.length))
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
    }, Math.floor(30000/props.bpm));
  }

  getNumberOfBits(props) {
    return Math.max(props.byteA.length, props.byteB.length);
  }

  handleTogglePlayback() {
    if (this.beatTimer == null) {
      this.setBeatTimer(this.props);
      this.setState({activeBitIndex: 0});

    }else {
      clearInterval(this.beatTimer);
      this.beatTimer = null;
      this.setState({activeBitIndex: -1});
    }
  }

  handleBPMChange(newBPM) {
    let validatedBPM = newBPM;
    if (validatedBPM < 1) {
      validatedBPM = 1;
    }else if (validatedBPM > 9999) {
      validatedBPM = 9999;
    }
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    gameStateSegments[0] = validatedBPM;
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

  handleRandomizeBits() {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    // randomize bytes
    gameStateSegments[1] = this.generateRandomBinaryNumber(gameStateSegments[1].length);
    gameStateSegments[2] = this.generateRandomBinaryNumber(gameStateSegments[2].length);

    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  handleRandomizeTracks() {
    const oldURL = this.props.history.location.pathname;
    const URLsegments = oldURL.split("/");
    const gameStateSegments = URLsegments[2].split("-");

    // randomize tracks
    gameStateSegments.slice(3).forEach((segment, index) => {
      gameStateSegments[index + 3] = Instrument.nameToAcronym(Instrument.names[Math.floor(Math.random()*Instrument.names.length)]) + 
        Operator.nameToAcronym(Operator.names[Math.floor(Math.random()*Operator.names.length)]);
    });

    URLsegments[2] = gameStateSegments.join("-");

    const newURL = URLsegments.join("/");
    this.props.history.replace(newURL);
  }

  generateRandomBinaryNumber = length => {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += ["0", "1"][Math.floor(Math.random()*2)];
    }
    return str;
  }

  canAddAnotherTrack = () => this.props.tracks.length <= 16;
  canAddBit = () => this.getNumberOfBits(this.props) <= 64;
  canRemoveBit = () => this.getNumberOfBits(this.props) > 2;

  render() {
    return (
      <div className="Drum-Machine">
        <div className="Title-row">
          <h1>Bitwise beat machine</h1>
          <div className="button-area">
            <a>share</a>
            <a>about</a>
            <a>help</a>
          </div>
        </div>
        <div className="Settings-Panel">
          <PlaybackSettings
            isPlaying={this.beatTimer != null}
            onTogglePlayback={this.handleTogglePlayback.bind(this)}     
          />
          <TempoSettings
            bpm={this.props.bpm}
            onBPMChange={this.handleBPMChange.bind(this)}
          />
          <TrackSettings
            numberOfTracks={this.props.tracks.length}
            onAddTrack={this.handleAddTrack.bind(this)}
            canAddTrack={this.canAddAnotherTrack()}
            onRandomizeTracks={this.handleRandomizeTracks.bind(this)}
          />
          <BitSettings
            numberOfBits={this.getNumberOfBits(this.props)}
            onAddBit={this.handleAddBit.bind(this)}
            onRemoveBit={this.handleRemoveBit.bind(this)}
            canAddBit={this.canAddBit()}
            canRemoveBit={this.canRemoveBit()}
            onRandomizeBits={this.handleRandomizeBits.bind(this)}
          />
        </div>
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
      </div>
    );
  }
}

export default DrumMachine;
