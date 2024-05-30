export type Task = {
    _id: string
    name: string
    taskDuration: number
    priority: number
    description: string
    isRepeating: boolean
    taskStartDate: Date
    taskStartTime: string
    taskEndTime : string
    taskAddedBy: string
    user: string
    tags?: string[]
}