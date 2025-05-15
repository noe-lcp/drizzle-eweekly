import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AppService, UserCreate } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:id')
  async getUser(@Param() params: { id: string }) {
    console.log(params.id);
  }

  @Post('/users/:id')
  async createUser(@Body() body: UserCreate) {
    console.log(body);
  }

  @Patch('/users/:id')
  async updateUser(@Param() params: { id: string }) {
    console.log(params.id);
  }

  @Delete('/users/:id')
  async deleteUser(@Param() params: { id: string }) {
    console.log(params.id);
  }
}
