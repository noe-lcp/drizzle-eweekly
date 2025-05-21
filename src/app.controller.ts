import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService, UserCreate, UserUpdate } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  async getUsers(@Query('page') page: number, @Query('size') size: number) {
    if (page && size) {
      console.log('typeof page, typeof size :>> ', typeof page, typeof size);
      const users = await this.appService.getUsers(Number(page), Number(size));
      return { items: users };
    }

    return {
      items: await this.appService.getUsers(),
    };
  }

  @Get('/users/:id')
  async getUser(@Param() { id }: { id: string }) {
    if (id) {
      const user = await this.appService.getUser(id);
      return user;
    }
  }

  @Post('/users')
  async createUser(@Body() body: UserCreate) {
    const id = await this.appService.createUser(body);

    return { id };
  }

  @Patch('/users/:id')
  async updateUser(@Param() params: { id: string }, @Body() body: UserUpdate) {
    const updatedUser = this.appService.updateUser({ ...body, id: params.id });

    return updatedUser;
  }

  @Delete('/users')
  async deleteUser(@Body() body: { id: string }) {
    const id = this.appService.deleteUser(body.id);

    return { id };
  }
}
