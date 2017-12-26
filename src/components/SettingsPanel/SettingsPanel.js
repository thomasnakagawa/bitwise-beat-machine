import React from 'react';
import PropTypes from 'prop-types';
import './SettingsPanel.css';

const PlaybackSettings = ({isPlaying, onTogglePlayback}) => (
  <div className="col">
    <button onClick={() => {
      onTogglePlayback();
    }}>{isPlaying ? "||" : ">"}</button>
  </div>
);

PlaybackSettings.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

const TempoSettings = ({bpm, onBPMChange}) => (
  <div className="col">
    Tempo
    <input type="number" value={bpm} onChange={event => {
      onBPMChange(event.target.value);
    }}/> bpm
  </div>
)

TempoSettings.propTypes = {
  bpm: PropTypes.number.isRequired,
  onBPMChange: PropTypes.func.isRequired
};

const BitSettings = ({numberOfBits, onAddBit, onRemoveBit, canAddBit, canRemoveBit, onRandomizeBits}) => (
  <div className="col">
    {numberOfBits} bits
    <button
      disabled={!canAddBit}
      onClick={() => {
        onAddBit();
      }}
      title="Add a bit"
    >Add bit</button>
    <button
      disabled={!canRemoveBit}
      onClick={() => {
        onRemoveBit();
      }}
      title="Remove a bit"
    >Remove bit</button>
    <button onClick={() => {
      onRandomizeBits();
    }}>Randomize bits</button>
  </div>
)

BitSettings.propTypes = {
  numberOfBits: PropTypes.number.isRequired,
  onAddBit: PropTypes.func.isRequired,
  onRemoveBit: PropTypes.func.isRequired,
  canAddBit: PropTypes.bool.isRequired,
  canRemoveBit: PropTypes.bool.isRequired,
  onRandomizeBits: PropTypes.func.isRequired
};

const TrackSettings = ({numberOfTracks, onAddTrack, canAddTrack, onRandomizeTracks}) => (
  <div className="col">
    {numberOfTracks} tracks
    <button
      disabled={!canAddTrack}
      onClick={() => {
        onAddTrack();
      }}
    >Add track</button>
    <button
      onClick={() => {
        onRandomizeTracks();
      }}
    >Randomize tracks</button>
  </div>
)

TrackSettings.propTypes = {
  numberOfTracks: PropTypes.number.isRequired,
  onAddTrack: PropTypes.func.isRequired,
  canAddTrack: PropTypes.bool.isRequired,
  onRandomizeTracks: PropTypes.func.isRequired
};

export {PlaybackSettings, BitSettings, TrackSettings, TempoSettings};
