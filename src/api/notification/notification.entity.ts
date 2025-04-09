import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column('jsonb', { nullable: true })
  //   secondary_title: ILANG;

  //   @Column('varchar', { nullable: true })
  //   secondary_image: string;

  //   @Column('jsonb', { nullable: true })
  //   secondary_description: ILANG;
  @Column('varchar', { nullable: true })
  employeeNoString: string;

  @Column('varchar', { nullable: true })
  name: string;


  @Column('varchar', { nullable: true })
  status: string;

  @Column('varchar', { nullable: true })
  dateTime: string;

  @Column('varchar', { nullable: true })
  majorEventType: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  //   @UpdateDateColumn()
  //   updatedAt: Date;
}
