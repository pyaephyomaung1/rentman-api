import {
  Body,
  Controller,
  Get,
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

  @Get('me')
  @Roles(Role.STORE_OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findMyWorkspace(@Request() req) {
    const id = req.user.id as number;
    return this.workspaceService.findMyWorkspace(id);
  }
}
