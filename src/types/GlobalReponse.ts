export type GlobalResponse<T> = {
    code: number;
    msg: string;
    data: T;
};