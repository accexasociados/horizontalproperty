import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreatePermissionDto } from 'src/apis/permission/dto/create-permission.dto';

export class CreateProfileDto {

  @IsString()
  @ApiProperty({
    description: 'id del perfil',
    required: false,
    type: String,
  })
  _id?: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Nombre del perfile a trabajar',
    required: true,
    type: String,
  })
  readonly name: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Estado del usuario Activo / Inactivo',
    required: false,
    type: Boolean,
    default: true,
  })
  readonly state: boolean;

  // @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  @ApiProperty({
    description: 'Lista de id el cual tiene permisos el usuario',
    required: true,
    type: () => [CreatePermissionDto],
    // isArray: true,
  })
  permissions: CreatePermissionDto[];
}
