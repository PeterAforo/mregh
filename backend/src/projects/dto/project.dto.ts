import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsOptional() @IsString()
  content?: string;

  @IsOptional() @IsString()
  client?: string;

  @IsOptional() @IsString()
  location?: string;

  @IsOptional() @IsString()
  year?: string;

  @IsOptional() @IsBoolean()
  featured?: boolean;

  @IsOptional() @IsBoolean()
  published?: boolean;

  @IsOptional() @IsString()
  coverImage?: string;

  @IsOptional() @IsString()
  images?: string;

  @IsOptional() @IsNumber()
  order?: number;
}

export class UpdateProjectDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  description?: string;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional() @IsString()
  content?: string;

  @IsOptional() @IsString()
  client?: string;

  @IsOptional() @IsString()
  location?: string;

  @IsOptional() @IsString()
  year?: string;

  @IsOptional() @IsBoolean()
  featured?: boolean;

  @IsOptional() @IsBoolean()
  published?: boolean;

  @IsOptional() @IsString()
  coverImage?: string;

  @IsOptional() @IsString()
  images?: string;

  @IsOptional() @IsNumber()
  order?: number;
}
