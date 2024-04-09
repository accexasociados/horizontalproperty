import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './entities/permission.entity';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private _permissionModel: Model<Permission>) {}

  create(permission: CreatePermissionDto) {
    this._validateActionConsult(permission);
    const permissionModel = new this._permissionModel(permission);
    return permissionModel.save();
  }

  async findAll() {
    return await this._permissionModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, permission: UpdatePermissionDto) {
    this._validateActionConsult(permission);
    const user = this._permissionModel.findByIdAndUpdate(id, { $set: permission }, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('USERNOTFOUND');
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }

  private _validateActionConsult(permission: CreatePermissionDto | UpdatePermissionDto): void {
    if (!permission.consult) {
      permission.create = permission.consult;
      permission.cancel = permission.consult;
      permission.update = permission.consult;
    }
  }
}
