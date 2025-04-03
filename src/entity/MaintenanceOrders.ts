import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('maintenance_orders')
export class MaintenanceOrders {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    user_id: number; // 用户ID

    @Column({ type: 'int' })
    dev_id: number; // 设备苗木ID

    // 0表示问诊 1表示工单 2表示浇水
    @Column({ type: 'tinyint' })
    maintenance_categories: number; // 维护类别

    @Column({ type: 'datetime' })
    create_time: Date; // 创建时间

    @Column({ type: 'datetime', nullable: true })
    completion_time: Date | null; // 完成时间（可选）

    @Column({ type: 'tinyint', default: 0 })
    is_completion: number; // 是否完成，默认为0表示未完成

    // 新增的字段
    @Column({ type: 'json', nullable: true })
    user_images: string[] | null; // 存储用户上传的图片信息

    @Column({ type: 'text', nullable: true })
    consultation_description: string | null; // 存储用户问诊描述信息

    // 新增字段：模型建议
    @Column({ type: 'text', nullable: true })
    model_advice: string | null; // 模型建议

    // 新增字段：人工建议
    @Column({ type: 'text', nullable: true })
    manual_advice: string | null; // 人工建议
}