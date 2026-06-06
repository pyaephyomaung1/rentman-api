import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceStatus } from 'src/common/enums/workspaceStatus';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    private readonly userService: UsersService,
  ) {}

  async getAll() {
    return await this.workspaceRepository.find();
  }

  async findPendingWorkspaces() {
    return await this.workspaceRepository.findOne({
      where: {
        status: WorkspaceStatus.PENDING,
      },
      relations: {
        owner: true,
      },
    });
  }
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

  async update(ownerId: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.findMyWorkspace(ownerId);
    if (!workspace) {
      throw new NotFoundException("You don't have workspace to update");
    }
    if (workspace.status === WorkspaceStatus.BANNED) {
      throw new ForbiddenException('Your workspace has banned.');
    }
    Object.assign(workspace, updateWorkspaceDto);
    return this.workspaceRepository.save(workspace);
  }

  async resubmit(ownerId: number) {
    const workspace = await this.findMyWorkspace(ownerId);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    if (workspace.status === WorkspaceStatus.BANNED) {
      throw new ForbiddenException('Your workspace has been banned.');
    }

    if (workspace.status !== WorkspaceStatus.REJECTED) {
      throw new ForbiddenException('Your workspace cannot be resubmitted.');
    }

    workspace.status = WorkspaceStatus.PENDING;
    workspace.rejectedReason = '';

    return this.workspaceRepository.save(workspace);
  }
}
