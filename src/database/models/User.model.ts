import * as bcrypt from 'bcryptjs';
import { authenticator } from 'otplib';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  hooks: {
    async afterCreate(attributes) {
      const user = attributes;
      const totp = authenticator.generateSecret();
      await user.update({ totp });
    },
    async afterBulkCreate(users) {
      for (let index = 0; index < users.length; index += 1) {
        await this.afterCreate(users[index]);
      }
    },
  },
  paranoid: true,
  timestamps: true,
})
export class User extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataTypes.STRING,
  })
  public id: string;

  @IsUUID('4')
  @Column({
    type: DataTypes.STRING,
  })
  public refererId: string;

  @Column({ type: DataTypes.STRING, allowNull: true })
  public cohortId: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  public email: string;

  @Column({ type: DataTypes.STRING })
  public firstName: string;

  @Column({ type: DataTypes.STRING })
  public lastName: string;

  @Column({ type: DataTypes.STRING })
  public otherNames: string;

  @Column({ type: DataTypes.STRING })
  public avatar: string;

  @Column({ type: DataTypes.STRING, unique: true })
  public linkedinId: string;

  @Column({ type: DataTypes.STRING, unique: true })
  public twitterId: string;

  @Column({ type: DataTypes.STRING, unique: true })
  public facebookId: string;

  @Column({ type: DataTypes.STRING, unique: true })
  public googleId: string;

  @Column({
    type: DataTypes.STRING,
    values: ['student', 'admin', 'tutor', 'sub-admin'],
    defaultValue: 'student',
  })
  public type: 'student' | 'admin' | 'sub-admin' | 'tutor';

  @Column({
    type: DataTypes.STRING,
    values: ['male', 'female'],
  })
  public gender: 'male' | 'female';

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
    values: ['active', 'suspended', 'blocked'],
  })
  public status: 'active' | 'suspended' | 'blocked';

  @Column({ type: DataTypes.STRING })
  public phone: string;

  @Column({ type: DataTypes.STRING })
  public country: string;

  @Column({
    type: DataTypes.STRING,
    set(value: string) {
      const salt = bcrypt.genSaltSync();
      this.setDataValue('password', bcrypt.hashSync(value, salt));
    },
  })
  public password: string;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  public verifiedEmail: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  public verifiedPhone: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  public isActive: boolean;

  @Column({ type: DataTypes.TEXT })
  public totp: string;

  @Column({
    type: DataTypes.STRING,
    defaultValue: Date.now(),
    allowNull: false,
  })
  public lastLoggedInAt: string;

  toJSON() {
    const data = this.dataValues;
    delete data.password;
    delete data.totp;
    delete data.deletedAt;

    return data;
  }

  validatePassword(val: string) {
    return bcrypt.compareSync(val, this.getDataValue('password'));
  }

  validateTotp(token: string, digits = 6, window = 5) {
    authenticator.options = { digits, step: window * 60 };
    return authenticator.check(token, this.getDataValue('totp'));
  }

  generateTotp(digits = 6, window = 5) {
    authenticator.options = { digits, step: window * 60 };
    return authenticator.generate(this.getDataValue('totp'));
  }

  async regenerateOtpSecret() {
    const user = await User.findByPk(this.id);
    user.update({ totp: authenticator.generateSecret() });
  }
}
