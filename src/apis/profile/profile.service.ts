import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Model } from 'mongoose';
import { Profile } from './entities/profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private _profileModel: Model<Profile>,
    @InjectModel(Permission.name) private _permissionModel: Model<Permission>,
  ) {}

  create(profile: CreateProfileDto) {
    this._validateSelectionPermissions(profile);
    const permissionModel = new this._profileModel(profile);
    return permissionModel.save();
  }

  async findAll() {
    const profiles = await this._profileModel.find().exec();
    if (profiles.length > 0) {
      this._concatPermissions(profiles);
    }
    return profiles;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, profile: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
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
