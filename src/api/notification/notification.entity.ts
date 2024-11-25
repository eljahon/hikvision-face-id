
import { ILANG } from "src/iterfaces";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('notification')
export class NotificationEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('jsonb', {nullable: true})
   secondary_title: ILANG

   @Column('varchar', {nullable: true})
   secondary_image: string

   @Column('jsonb', {nullable: true})
   secondary_description: ILANG
   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;
 
   @UpdateDateColumn()
   updatedAt: Date;
}