import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Profile } from './entities/profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private _profileModel: Model<Profile>,
  ) {}

  create(profile: CreateProfileDto) {
    this._validateSelectionPermissions(profile);
    const permissionModel = new this._profileModel(profile);
    return permissionModel.save();
  }

  async findAll() {
    const profiles = await this._profileModel.find().exec();
    return profiles;
  }

  async findOne(id: number) {
    return await this._profileModel.findById(id).exec();
  }

  update(id: number, profile: UpdateProfileDto) {
    const user = this._profileModel.findByIdAndUpdate(id, { $set: profile }, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('USERNOTFOUND');
    }
    return user;
  }

  remove(id: number) {
    const user = this._profileModel.findByIdAndUpdate(id, { $set: { state: false } }, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('USERNOTFOUND');
    }
    return user;
  }

  private _validateSelectionPermissions(
    profile: CreateProfileDto | UpdateProfileDto,
  ) {
    profile.permissions = profile.permissions
      .map((permission) => {
        if (!permission.consult) {
          permission.cancel = permission.consult;
          permission.create = permission.consult;
          permission.update = permission.consult;
        }
        return permission;
      })
      .filter((permission) => permission.consult);
  }

  private async _concatPermissions(profile: Profile[]) {
    const permissions = await this._permissionModel.find().exec();
    console.log(permissions, profile);
  }
}
