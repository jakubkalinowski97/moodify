export interface NewSound {
    name: string,
    type: string,
    category_id: number | null;
    subcategory_id: number | null;
    file: File | null,
    isVisible: boolean;
}
