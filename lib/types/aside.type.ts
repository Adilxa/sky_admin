export interface AsideType {
    title: string,
    path: string,
    subPath?: AsideSubPath[],
    visibleState?: boolean,
}

export interface AsideSubPath {
    path: string,
    title: string,
}