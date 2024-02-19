/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
// import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
// singleton
  constructor(private readonly usersService: UsersService) {}
  /* 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users
*/
// It follows a waterfall route, the order in a controller matters, it follows the waterfall route/method
  @Get()  // Get /users  or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  // @Get(':id')
  // // the param decorator
  // findOne(@Param('id') id: string) {
  //   return this .usersService.findOne(+id); // use of the unaryplus(+)
  // }

  // using the ParseIntPipe , removes the unary (+id)
  @Get(':id')
  // the param decorator
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this .usersService.findOne(id); // use of the unaryplus(+)
  }
  
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // another correct pattern, you can use 'user' or CreateUserDto
  // @Post()
  // create(@Body() CreateUserDto: CreateUserDto) {
  //   return this.usersService.create(CreateUserDto);
  // }

  // @Patch(':id')
  // // the param decorator
  // update(@Param('id') id: string, @Body() userUpdate: {name?: string, email?:
  //   string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
  //   return this.usersService.update(+id, userUpdate)
  // }

  // using the ParseIntPipe, removes the unary (+id)
  @Patch(':id')
  // the param decorator
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }


  @Delete(':id') // Delete
  // the param decorator
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
