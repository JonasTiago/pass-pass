import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { UserParam } from 'src/decorators/users.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto,@UserParam() user:User) {
    return this.credentialService.create(createCredentialDto, user.id);
  }

  @Get()
  findAll() {
    return this.credentialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.credentialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    return this.credentialService.update(+id, updateCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialService.remove(+id);
  }
}
