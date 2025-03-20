import { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define a TypeScript interface for the User model
interface IUser extends Document {
  googleId?: string;
  email: string;
  password?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// Define the Mongoose schema
const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values for non-Google users
    },
    email: {
      type: String,
      unique: [true, 'Email already exists.'],
      required: [true, 'Email is required.'],
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId; // Password is required only if not using Google login
      },
      minlength: [8, 'Password must be at least 8 characters'],
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords for login
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

// Define the User model with TypeScript support
const User = models.User || model<IUser>('User', UserSchema);

export default User;
