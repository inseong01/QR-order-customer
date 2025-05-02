import { SliceCreator } from "@/types/common";

type InitialState = {
  categoryState: {
    id: number;
  };
};

const initialState: InitialState = {
  categoryState: {
    id: 1,
  },
};

export interface MenuCategorySlice {
  categoryState: {
    id: number;
  };
  selectMenuCategoryId: ({ id }: { id: number }) => void;
}

export const menuCategorySlice: SliceCreator<MenuCategorySlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        selectMenuCategoryId: ({ id }: { id: number }) =>
          set(
            () => ({ categoryState: { id: id } }),
            undefined,
            "categoryState/selectMenuCategoryId",
          ),
      })
    : (set) => ({
        ...initialState,
        selectMenuCategoryId: ({ id }: { id: number }) =>
          set(() => ({ categoryState: { id: id } })),
      });
