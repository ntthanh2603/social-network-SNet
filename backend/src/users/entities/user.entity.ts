import { MaxLength, MinLength } from 'class-validator';
import { GenderType, PrivacyType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @Column({ default: null })
  avatar: string;

  @Column()
  username: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  website: string;

  @Column({ default: null })
  birthday: Date;

  @Column({ type: 'enum', enum: GenderType, default: null })
  gender: GenderType;

  @Column({ default: null })
  address: string;

  @Column({ type: 'enum', enum: PrivacyType, default: PrivacyType.PUBLIC })
  privacy: PrivacyType;

  @Column({ default: 0 })
  followerCount: number;

  @Column({ default: 0 })
  followedCount: number;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;
}
