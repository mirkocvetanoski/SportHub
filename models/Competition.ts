import { Schema, model, models, Document } from 'mongoose';

interface ICompetitions extends Document {
  competitions: string[];
}

// Define the Mongoose schema
const CompetitionsSchema = new Schema<ICompetitions>(
  {
    competitions: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// Define the Competitions model with TypeScript support
const Competitions =
  models.Competitions ||
  model<ICompetitions>('Competitions', CompetitionsSchema);

export default Competitions;
