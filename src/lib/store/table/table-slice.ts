import { SliceCreator } from '@/types/common';

type InitialState = {
  tableState: {
    tableName: string;
  };
};

const initialState: InitialState = {
  tableState: {
    tableName: '',
  },
};

export interface TableSlice {
  tableState: {
    tableName: string;
  };
  setTableNumber: ({ table }: { table: string }) => void;
}

export const tableSlice: SliceCreator<TableSlice> =
  process.env.NODE_ENV === 'development'
    ? (set) => ({
        ...initialState,
        setTableNumber: ({ table }: { table: string }) =>
          set(() => ({ tableState: { tableName: table } }), undefined, 'tableState/setTableNumber'),
      })
    : (set) => ({
        ...initialState,
        setTableNumber: ({ table }: { table: string }) => set(() => ({ tableState: { tableName: table } })),
      });
