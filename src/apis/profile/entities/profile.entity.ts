import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission, PermissionSchema } from 'src/apis/permission/entities/permission.entity';

@Schema()
export class Profile extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  state: boolean;

  @Prop({ type: [PermissionSchema] })
  permissions: Types.Array<Permission>;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
