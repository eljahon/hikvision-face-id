import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hikvision_user_add')
export class HikvisionUserAddEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: true })
    name: string;
    
    
}