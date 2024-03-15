import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'rns_record',
  paranoid: true,
  timestamps: true,
})
export class Record extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataTypes.STRING,
  })
  public id: string;

  @Column({ type: DataTypes.REAL, allowNull: true })
  public nAVAXPrice: number;

  @Column({ type: DataTypes.REAL, allowNull: true })
  public usdPrice: number;
}
