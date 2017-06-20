declare namespace stringz {
  export function length(str: string): number;
  export function substring(str: string, begin?: number, end?: number): string;
  export function substr(str: string, begin?: number, length?: number): string;
  export function limit(str: string, limit?: number, padString?: string, padPosition?: 'right'|'left') : string;
}

export = stringz;
