import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { username, about, email, password, avatar } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.usersRepository.create({
      username,
      about,
      email,
      password: hashedPassword,
      avatar,
    });
    try {
      await this.usersRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email or username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }
  findByUsername(username: string): Promise<UserEntity> {
    console.log(username);
    return this.usersRepository.findOneBy({ username });
  }
  findByUserId(id: number): Promise<UserEntity> {
    console.log(id);
    return this.usersRepository.findOneBy({ id });
  }
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.usersRepository.update({ id }, updateUserDto);
    return this.findByUserId(id);
  }

  // getById(id): Promise<UserEntity> {
  //     const found = this.tasksRepository.findOneBy({ id });
  //     if (!found) {
  //         throw new NotFoundException('task not found');
  //     }
  //     return found;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): ITask[] {
  //   const { search, status } = filterDto;
  //   console.log(status);
  //   let tasks = this.tasks;
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       return (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       );
  //     });
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //     console.log(tasks);
  //   }
  //   return tasks;
  // }
  //
  // async createUser(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
  //     const { title, description } = createTaskDto;
  //     const newTask = this.tasksRepository.create({
  //         title,
  //         description,
  //         status: TaskStatus.OPEN,
  //     });
  //     await this.tasksRepository.save(newTask);
  //     return newTask;
  // }
  // updateTask(id: string, status: TaskStatus): ITask {
  //   const task = this.getById(id);
  //   task.status = status;
  //   return task;
  // }
  // async deleteTask(id: string): Promise<void> {
  //     const result = await this.tasksRepository.delete({ id });
  //     if (result.affected === 0) {
  //         throw new NotFoundException(`Task with ID: ${id} not found`);
  //     }
  // }
}
