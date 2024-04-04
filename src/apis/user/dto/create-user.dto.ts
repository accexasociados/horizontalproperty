import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Este es le id del perfil que tiene el usuario',
        required: true,
        type: String
    })
    idProfile: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Este es el username del usuario para que pueda ingresar',
        required: true,
        type: String
    })
    username: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    name: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Campo donde se guardara la ruta de la imagen que se cargue del usuario',
        required: false,
        type: String
    })
    image: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Campo email del usuario',
        required: false,
        type: String
    })
    email: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Campo del password del usuario donde se guardara encriptado',
        required: false,
        type: String
    })
    password: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Estado del usuario Activo / Inactivo',
        required: false,
        type: Boolean,
        default: true
    })
    state: boolean;
}
