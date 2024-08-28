export class Filter<T> {
  query: Partial<T> = {};

  constructor(filter: Partial<T>) {
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if (value !== undefined && value !== null) {
          this.query[key] = value;
        }
      }
    }
  }
}
