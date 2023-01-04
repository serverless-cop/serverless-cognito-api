export interface TodoGetParams{
    id: string
}
export interface TodoEntity{
    id: string
    name: string
    description: string
    deadline: string
}
export interface TodoCreateParams{
    name: string
    description: string
    deadline: string
}

export type TodoEditParams = TodoEntity
export type TodoDeleteParams = TodoGetParams
