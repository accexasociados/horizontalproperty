import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";

@Schema()
export class Permission extends Document {

  @Prop({ type: Types.ObjectId, ref: Permission.name })
  parentId: Types.Array<Permission | Types.ObjectId> ;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  name: string;
  @Prop({ default: false })
  create: boolean;
  @Prop({ default: false })
  update: boolean;
  @Prop({ default: false })
  cancel: boolean;
  @Prop({ default: false })
  consult: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
