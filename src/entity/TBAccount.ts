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
export class TBAccount {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public userName: string;

    @Column()
    public password: string;

    @Column()
    public domain: string;
}
