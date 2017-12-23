import KickSound from '../assets/sounds/kick.wav'
import HihatSound from '../assets/sounds/hat.wav'
import SnareSound from '../assets/sounds/snare.wav'
import KickIcon from '../assets/icons/kickIcon.svg'
import SnareIcon from '../assets/icons/snareIcon.svg'
import HihatIcon from '../assets/icons/hatIcon.svg'

const Instrument = {
  acronymToObject: instrumentAcronym => ({
    "k": {
      soundFile: KickSound,
      name: "Kick",
      icon: KickIcon
    },
    "h": {
      soundFile: HihatSound,
      name: "Hihat",
      icon: HihatIcon
    },
    "s": {
      soundFile: SnareSound,
      name: "Snare",
      icon: SnareIcon
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
