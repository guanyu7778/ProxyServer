import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';

@Entity()
export class Proxy {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public ip: string;

    @Column()
    public port: number;

    @Column()
    public isActive: boolean;
}
