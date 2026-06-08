import { Role } from 'src/common/enums/role';
import { Workspace } from 'src/modules/workspace/entities/workspace.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STORE_OWNER,
  })
  role: Role;

  @OneToOne(() => Workspace, (workspace) => workspace.owner)
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
