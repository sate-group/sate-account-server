import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  /**
   *  essential information
   */

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  hashedPassword: string;

  /**
   * verified
   */

  @Column({ default: false })
  isEmailVerified: boolean;

  /**
   * additional information
   */

  @Column()
  displayName: string;

  @Column({ nullable: true })
  mention: string;  // like description

  @Column({ nullable: true })
  photoUrl: string;

  /**
   * date
   */

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated: Date;
}
