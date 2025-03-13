import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_dev_mapping')
export class UserDevMapping {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    user_id: number; // 用户ID

    @Column({ type: 'int' })
    dev_id: number; // 设备ID


}