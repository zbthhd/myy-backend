import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('maintenance_orders')
export class MaintenanceOrders {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    user_id: number; // 用户ID

    @Column({ type: 'tinyint' })
    maintenance_categories: number; // 维护类别

    @Column({ type: 'datetime' })
    create_time: Date; // 创建时间

    @Column({ type: 'datetime', nullable: true })
    completion_time: Date | null; // 完成时间（可选）

    @Column({ type: 'tinyint', default: 0 })
    is_completion: number; // 是否完成，默认为0表示未完成

    // 如果需要其他字段或关系，可以继续添加
}