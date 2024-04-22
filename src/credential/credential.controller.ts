import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UserParam } from 'src/decorators/users.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto, @UserParam() user:User) {
    return this.credentialService.create(createCredentialDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@UserParam() user:User) {
    return this.credentialService.findAll(user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @UserParam() user:User) {
    return this.credentialService.findOne(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialService.remove(id);
  }
}
