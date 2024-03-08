import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    trim: true,
    unique: true,
    validate: validator.isEmail,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, maxlength: 100, trim: true })
  name: string;

  @Prop({
    required: true,
    validate: (val) =>
      validator.isStrongPassword(val, { minLowercase: 0, minUppercase: 0 }),
  })
  password: string;

  comparePassword: (this: User, password) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    return next(error);
  }
});

UserSchema.method(
  'comparePassword',
  async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  },
);

UserSchema.methods.toJSON = function () {
  const user: User = this.toObject();
  delete user.password;
  return user;
};
