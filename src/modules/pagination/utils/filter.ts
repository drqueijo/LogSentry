export class Filter<T> {
  query: Partial<T> = {};

  private getDateRangeQuery(dateRange: string) {
    const [startDate, endDate] = dateRange
      .split(',')
      .map((date) => new Date(date));
    return {
      $gte: startDate.setUTCHours(0, 0, 0, 0),
      $lte: endDate.setUTCHours(23, 59, 59, 999),
    };
  }

  private getArrayQuery(value: string) {
    return { $in: value.split(',') };
  }

  private getSearchQuery(value: string, searchFields: Array<string>) {
    return {
      $or: searchFields.map((field) => ({
        [field]: { $regex: new RegExp(value, 'i') },
      })),
    };
  }

  constructor(filter: Partial<T>, searchFields?: Array<string>) {
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if (value !== undefined && value !== null) {
          if (key === 'dateRange' && typeof value === 'string') {
            this.query['createdAt'] = this.getDateRangeQuery(value);
            continue;
          }

          if (typeof value === 'string' && value.includes(',')) {
            this.query[key] = this.getArrayQuery(value);
            continue;
          }

          this.query[key] = value;
        }
      }

      if (Object.keys(this.query).includes('search')) {
        const searchValue = this.query['search'] as string;
        delete this.query['search'];
        if (searchFields) {
          this.query = {
            ...this.query,
            ...this.getSearchQuery(searchValue, searchFields),
          };
        }
      }
    }
  }
}
