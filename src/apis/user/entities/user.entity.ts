import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required: true })
    idProfile: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    image: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true })
    state: boolean;

    @Prop({ required: true, default: Date.now })
    createdate: Date;

    @Prop({ default: Date.now })
    updatedate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
