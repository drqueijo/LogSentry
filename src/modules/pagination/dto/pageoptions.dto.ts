import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly pageSize?: number = 10;

  @Type(() => String)
  @IsOptional()
  readonly sortBy?: string;

  @IsEnum({ asc: 'asc', desc: 'desc' })
  readonly sortOrder?: 'asc' | 'desc' = 'desc';
}
