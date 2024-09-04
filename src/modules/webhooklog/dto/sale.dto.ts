import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class SaleDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  code?: string | null;
}
