import KickSound from '../sounds/kick.wav'
import HihatSound from '../sounds/hat.wav'
import SnareSound from '../sounds/snare.wav'

const Instrument = {
  acronymToObject: instrumentAcronym => ({
    "k": {
      soundFile: KickSound,
      name: "Kick"
    },
    "h": {
      soundFile: HihatSound,
      name: "Hihat"
    },
    "s": {
      soundFile: SnareSound,
      name: "Snare"
    }
  }[instrumentAcronym]),

  nameToAcronym: instrumentName => ({
    "Kick": "k",
    "Hihat": "h",
    "Snare": "s"
  }[instrumentName]),

  names: [
    "Kick", "Hihat", "Snare"
  ]
}

export default Instrument;
