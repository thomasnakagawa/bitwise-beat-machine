import KickSound from '../assets/sounds/kick.wav';
import HihatSound from '../assets/sounds/hihat.wav';
import SnareSound from '../assets/sounds/snare.wav';
import TomSound from '../assets/sounds/tom.wav';
import CymbalSound from '../assets/sounds/cymbal.wav';
import TambSound from '../assets/sounds/tamb.wav';
import BellSound from '../assets/sounds/bell.wav';

import KickIcon from '../assets/icons/kickIcon.svg';
import SnareIcon from '../assets/icons/snareIcon.svg';
import HihatIcon from '../assets/icons/hatIcon.svg';
import TomIcon from '../assets/icons/tomIcon.svg';
import CymbalIcon from '../assets/icons/cymbalIcon.svg';
import TambIcon from '../assets/icons/tambIcon.svg';
import BellIcon from '../assets/icons/bellIcon.svg';

const Instrument = {
  acronymToObject: instrumentAcronym => ({
    "k": {
      soundFile: KickSound,
      name: "Kick",
      icon: KickIcon
    },
    "h": {
      soundFile: HihatSound,
      name: "Hi-hat",
      icon: HihatIcon
    },
    "s": {
      soundFile: SnareSound,
      name: "Snare",
      icon: SnareIcon
    },
    "t": {
      soundFile: TomSound,
      name: "Tom-tom",
      icon: TomIcon
    },
    "c": {
      soundFile: CymbalSound,
      name: "Cymbal",
      icon: CymbalIcon
    },
    "a": {
      soundFile: TambSound,
      name: "Tambourine",
      icon: TambIcon
    },
    "b": {
      soundFile: BellSound,
      name: "Cowbell",
      icon: BellIcon
    }
  }[instrumentAcronym]),

  nameToAcronym: instrumentName => ({
    "Kick": "k",
    "Hi-hat": "h",
    "Snare": "s",
    "Tom-tom": "t",
    "Cymbal": "c",
    "Tambourine": "a",
    "Cowbell": "b",
  }[instrumentName]),

  names: [
    "Kick", "Hi-hat", "Snare", "Tom-tom", "Cymbal", "Tambourine", "Cowbell"
  ]
}

export default Instrument;
