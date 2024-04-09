import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePermissionDto {

    @IsOptional()
    @IsMongoId()
    @ApiProperty({
        description: 'Este es le id del peermiso padre, es cuando el perfil actual depende de otro',
        required: false,
        type: String
    })
    parentId: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Este es el codigo interno del permiso el cual se validara para las diferentes opciones',
        required: true,
        type: String
    })
    code: string;

    @IsString()
    @MinLength(1)
    @ApiProperty({
        description: 'Este es el nombre que se visualizara para las opciones de permisos',
        required: true,
        type: String
    })
    name: string;

    
    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        description: 'Acción crear permite que el usuario pueda crear documentos y mas, según el permiso',
        required: true,
        type: Boolean
    })
    create: boolean;
    
    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        description: 'Acción permite que el usuario pueda modificar documentos y mas, según el permiso',
        required: true,
        type: Boolean
    })
    update: boolean;
    
    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        description: 'Acción permite que el usuario pueda cancelar o eliminar documentos y mas, según el permiso',
        required: true,
        type: Boolean
    })
    cancel: boolean;
    
    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        description: 'Acción permite que el usuario pueda consultar documentos y mas, según el permiso',
        required: true,
        type: Boolean
    })
    consult: boolean;
}
