import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private _userModel: Model<User>) {

  }

  create(createUserDto: CreateUserDto) {
    const user = new this._userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this._userModel.find().exec();
  }

  async findOne(id: string) {
    return await this._userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this._userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('USERNOTFOUND');
    }
    return user;
  }

  remove(id: string) {
    return this._userModel.findByIdAndDelete(id);
  }
}
