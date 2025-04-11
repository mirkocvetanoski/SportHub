import { Schema, model, models, Document } from 'mongoose';

interface ICountry {
  GN: string;
}

interface ICountries extends Document {
  competition: string;
  countries: ICountry[];
}

const CountrySubSchema = new Schema<ICountry>(
  {
    GN: {
      type: String,
      required: true,
    },
  },
  { _id: false } // Prevent Mongoose from adding _id to each subdocument
);

const CountriesSchema = new Schema<ICountries>(
  {
    competition: {
      type: String,
      required: true,
    },
    countries: {
      type: [CountrySubSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Countries =
  models.Countries || model<ICountries>('Countries', CountriesSchema);

export default Countries;
