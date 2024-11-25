
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Parents } from "./types";

@Entity('user')
export class UserEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('varchar')
   type: string

   @Column('varchar')
   name: string

   @Column('varchar')
   employeeNoString: number

   @Column('varchar', {nullable: true})
   status: string

   @Column('jsonb', {nullable: true})
   parents: Parents[]

   @Column('varchar')
   image_link: string

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;
 
   @UpdateDateColumn()
   updatedAt: Date;
}