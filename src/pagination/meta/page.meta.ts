import { PageOptionsDto } from '../dto/pageoptions.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  readonly page: number = 1;

  readonly pageSize: number = 10;

  readonly itemCount: number = 0;

  readonly pageCount: number = 0;

  readonly hasPreviousPage: boolean = false;

  readonly hasNextPage: boolean = false;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.pageSize;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
