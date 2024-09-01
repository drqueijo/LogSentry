import { PageOptionsDto } from '../dto/pageoptions.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total: number;
}

export class PageMetaDto {
  readonly page: number = 1;

  readonly pageSize: number = 10;

  readonly total: number = 0;

  readonly pages: number = 0;

  readonly hasPreviousPage: boolean = false;

  readonly hasNextPage: boolean = false;

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.pageSize;
    this.total = total;
    this.pages = Math.ceil(this.total / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pages;
  }
}
