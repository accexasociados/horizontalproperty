import { registerAs } from "@nestjs/config";
import { DBConfigModel } from "src/models/database.models";

export default registerAs('database', () => ({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    user: process.env.DATABASE_USER || 'phsystem',
    pass: process.env.DATABASE_PASS || 'phsystem',
    name: process.env.DATABASE_NAME || 'phsystem',
  } as DBConfigModel));