import { Logger } from 'drizzle-orm';
import { format, ParamItems } from 'sql-formatter';

export class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    const p = params.reduce<ParamItems>((acc, item, i) => {
      acc[i + 1] = String(item);
      return acc;
    }, {});

    const formattedQuery = format(query, {
      language: 'postgresql',
      keywordCase: 'upper',
      params: p,
    });

    console.log(formattedQuery);
  }
}
