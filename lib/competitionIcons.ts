import {
  IoAmericanFootball,
  IoBaseball,
  IoBasketballOutline as IoBasketOutline,
  IoFootballOutline,
  IoTennisballOutline as IoTennisball,
} from 'react-icons/io5';
import {
  MdDownhillSkiing,
  MdOutlineSportsRugby,
  MdSportsEsports,
  MdSportsGymnastics,
  MdSportsHandball,
  MdSportsHockey,
  MdSportsVolleyball,
} from 'react-icons/md';
import {
  GiBoxingGlove,
  GiBrain,
  GiDart,
  GiPingPongBat,
  GiPodiumWinner,
  GiWaterPolo,
} from 'react-icons/gi';
import { RiBilliardsFill, RiFootballLine } from 'react-icons/ri';
import { PiBeachBallBold, PiMotorcycle } from 'react-icons/pi';
import { SiFifa } from 'react-icons/si';
import { BiHandicap } from 'react-icons/bi';

const competitionsIcons = {
  Football: IoFootballOutline,
  Basketball: IoBasketOutline,
  Tennis: IoTennisball,
  'American Football': IoAmericanFootball,
  Baseball: IoBaseball,
  Volleyball: MdSportsVolleyball,
  Boxing: GiBoxingGlove,
  Hockey: MdSportsHockey,
  Rugby: MdOutlineSportsRugby,
  'e-sports': MdSportsEsports,
  Darts: GiDart,
  Snooker: RiBilliardsFill,
  'Ping Pong': GiPingPongBat,
  Futsal: RiFootballLine,
  Handball: MdSportsHandball,
  Waterpolo: GiWaterPolo,
  'Winter Sports': MdDownhillSkiing,
  'Beach Soccer': PiBeachBallBold,
  Moto: PiMotorcycle,
  Atletica: MdSportsGymnastics,
  FIFA: SiFifa,
  'Special Games': BiHandicap,
  'Special Single': BiHandicap,
  Winner: GiPodiumWinner,
  Imaginary: GiBrain,
} as const;

export default competitionsIcons;
