import { SliceCreator } from '@/types/common';

type InitialState = {
  tableState: {
    tableNum: null | number;
  };
};

const initialState: InitialState = {
  tableState: {
    tableNum: null,
  },
};

export interface TableSlice {
  tableState: {
    tableNum: null | number;
  };
  setTableNumber: ({ table }: { table: number }) => void;
}

export const tableSlice: SliceCreator<TableSlice> =
  process.env.NODE_ENV === 'development'
    ? (set) => ({
        ...initialState,
        setTableNumber: ({ table }: { table: number }) =>
          set(() => ({ tableState: { tableNum: Number(table) } }), undefined, 'tableState/setTableNumber'),
      })
    : (set) => ({
        ...initialState,
        setTableNumber: ({ table }: { table: number }) =>
          set(() => ({ tableState: { tableNum: Number(table) } })),
      });
