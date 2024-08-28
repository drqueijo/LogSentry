import { SortOrder } from 'mongoose';

export class Sorter {
  private readonly defaultSort: { createdAt: SortOrder } = { createdAt: -1 };
  readonly sort: { [key: string]: SortOrder };

  constructor(field: string, order: SortOrder) {
    this.sort = field
      ? { [field]: order === 'desc' ? -1 : 1 }
      : this.defaultSort;
  }
}
