import { PageOptionsDto } from '@/modules/pagination/dto/pageoptions.dto';
import { Filter } from '@/modules/pagination/utils/filter';
import { Sorter } from '@/modules/pagination/utils/sorter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  create<T>(queryParams: PageOptionsDto & Partial<T>) {
    const { page, pageSize, sortBy, sortOrder, ...fields } = queryParams;
    const { query } = new Filter<T>(fields as Partial<T>);
    const { sort } = new Sorter(sortBy, sortOrder);

    return {
      page: +page || 1,
      pageSize: +pageSize || 10,
      query,
      sort,
      fields: { ...fields },
    };
  }
}
