import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('WebhookLog')
export class WebhookLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  webhookId: number | null;
}
