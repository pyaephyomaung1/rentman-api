import { WorkspaceStatus } from 'src/common/enums/workspaceStatus';
import { User } from 'src/modules/users/entities/users.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('workspace')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  logoUrl: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: WorkspaceStatus,
    default: WorkspaceStatus.PENDING,
  })
  status: WorkspaceStatus;

  @Column({
    nullable: true,
  })
  rejectedReason: string;

  @Column({
    nullable: true,
  })
  banReason: string;

  @OneToOne(() => User, (user) => user.workspace)
  @JoinColumn()
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
