import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceStatus } from 'src/common/enums/workspaceStatus';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly userService: UsersService,
  ) {}

  async create(ownerId: number, workspaceDto: CreateWorkspaceDto) {
    const owner = await this.userService.findById(ownerId);
    if (!owner) {
      throw new NotFoundException('User not found');
    }
    const existingWorkspace = await this.workspaceRepository.findOne({
      where: {
        owner: {
          id: ownerId,
        },
      },
    });
    if (existingWorkspace) {
      throw new ConflictException('You already have a workspace.');
    }
    const workspace = this.workspaceRepository.create({
      ...workspaceDto,
      status: WorkspaceStatus.PENDING,
      owner,
    });
    return this.workspaceRepository.save(workspace);
  }

  async findMyWorkspace(ownerId: number) {
    return this.workspaceRepository.findOne({
      where: {
        owner: {
          id: ownerId,
        },
      },
      relations: {
        owner: true,
      },
    });
  }
}
