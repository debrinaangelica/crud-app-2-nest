import {
    ArrayMinSize,
    IsAlphanumeric,
    IsArray,
    IsDefined,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
  } from 'class-validator'

import { StatusData } from 'src/common/enums';

export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    is_partner = 0; /** default value */

    @IsNotEmpty()
    @IsDefined()
    @IsNumber()
    role_id = 1; /** default value */

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @MinLength(6)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsNumber()
    @IsEnum(StatusData)
    status = StatusData.Active; /** default value */
}

export class UpdateUserDto {
    @IsOptional()
    @IsNumber()
    is_partner?: number;

    @IsOptional()
    @IsDefined()
    @IsNumber()
    role_id?: number; 

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @IsAlphanumeric()
    @MinLength(6)
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsDefined()
    @IsNumber()
    @IsEnum(StatusData)
    status?: StatusData;
}

export class UserResult {
    @IsNotEmpty()
    @IsNumber()
    is_partner: number;

    @IsNotEmpty()
    @IsDefined()
    @IsNumber()
    role_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsAlphanumeric()
    @MinLength(6)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsNumber()
    @IsEnum(StatusData)
    status: StatusData;

    created_at: Date;

    updated_at: Date;
}