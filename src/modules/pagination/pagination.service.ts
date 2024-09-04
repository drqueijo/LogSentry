import { PageOptionsDto } from '@/modules/pagination/dto/pageoptions.dto';
import { Filter } from '@/modules/pagination/utils/filter';
import { Sorter } from '@/modules/pagination/utils/sorter';
import { Injectable } from '@nestjs/common';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
@Injectable()
export class PaginationService {
  create<T>(
    queryParams: PageOptionsDto & DeepPartial<T>,
    searchFields?: Array<string>,
  ) {
    const { page, pageSize, sortBy, sortOrder, ...fields } = queryParams;
    const { query } = new Filter<T>(fields as Partial<T>, searchFields);
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
