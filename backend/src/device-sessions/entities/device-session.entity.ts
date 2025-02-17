import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DeviceSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @Index()
  @Column({ unique: true })
  deviceId: string;

  @Column()
  ipAddress: string;

  @Column()
  secretKey: string;

  @Column({ default: null })
  lastActive: Date;

  @Column()
  refreshToken: string;

  @Column()
  expiredAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
