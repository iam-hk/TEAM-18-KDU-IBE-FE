export interface Filter {
  filterTitle: string;
  options: string[];
}
export interface Sorting {
  sortDisplayName: string;
  variable: string;
  order: boolean;
}

export interface IDropDownSort {
  sorts: Sorting[];
}
