import { SliceCreator } from '@/types/common';

type InitialState = {
  menuState: {
    selectedMenuCategoryId: number;
  };
};

const initialState: InitialState = {
  menuState: {
    selectedMenuCategoryId: 1,
  },
};

export interface MenuSlice {
  menuState: {
    selectedMenuCategoryId: number;
  };
  getSelectedMenuCategoryId: ({ id }: { id: number }) => void;
}

export const menuSlice: SliceCreator<MenuSlice> =
  process.env.NODE_ENV === 'development'
    ? (set) => ({
        ...initialState,
        getSelectedMenuCategoryId: ({ id }: { id: number }) =>
          set(
            () => ({ menuState: { selectedMenuCategoryId: id } }),
            undefined,
            'menuSlice/getSelectedMenuCategoryId'
          ),
      })
    : (set) => ({
        ...initialState,
        getSelectedMenuCategoryId: ({ id }: { id: number }) =>
          set(() => ({ menuState: { selectedMenuCategoryId: id } })),
      });
