import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Roles } from 'src/common/decorators/role-decorator';
import { Role } from 'src/common/enums/role';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @Roles(Role.STORE_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Request() req, @Body() workspaceDto: CreateWorkspaceDto) {
    const id = req.user.id as number;
    return this.workspaceService.create(id, workspaceDto);
  }

  @Patch('me')
  @Roles(Role.STORE_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Request() req, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    const id = req.user.id as number;
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Post('me/resubmit')
  @Roles(Role.STORE_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  resubmite(@Request() req) {
    const id = req.user.id as number;
    return this.workspaceService.resubmit(id);
  }

  @Get('me')
  @Roles(Role.STORE_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findMyWorkspace(@Request() req) {
    const id = req.user.id as number;
    return this.workspaceService.findMyWorkspace(id);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtStrategy)
  findAllWorkspaces() {
    return this.workspaceService.getAll();
  }

  @Get('pending')
  findPendingWorkspaces() {
    return this.workspaceService.findPendingWorkspaces();
  }
}
