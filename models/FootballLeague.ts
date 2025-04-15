import { Schema, model, models, Document } from 'mongoose';

// Define the League interface
interface ILeague {
  LN: string;
}

// Define the FootballLeagues interface
interface IFootballLeagues extends Document {
  country: string;
  footballLeagues: ILeague[];
}

// Define the Mongoose schema for FootballLeagues
const LeagueSchema = new Schema<ILeague>(
  {
    LN: { type: String, required: true },
  },
  { _id: false } // Prevent adding _id to individual items in the array
);

const FootballLeaguesSchema = new Schema<IFootballLeagues>(
  {
    country: {
      type: String,
      required: true,
    },
    footballLeagues: {
      type: [LeagueSchema], // Array of objects, each containing an LN field
      required: true,
    },
  },
  { timestamps: true }
);

// Define the FootballLeagues model with TypeScript support
const FootballLeagues =
  models.FootballLeagues ||
  model<IFootballLeagues>('FootballLeagues', FootballLeaguesSchema);

export default FootballLeagues;
