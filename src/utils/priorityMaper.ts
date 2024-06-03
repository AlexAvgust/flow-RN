export const priorities = [
    { label: 'Low', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'High', value: 2 },
    { label: 'Urgent', value: 3 },
    { label: 'Critical', value: 4 },
]

export const getPriorityLabel = (priority: number): string => {
    const priorities = ['Low', 'Medium', 'High', 'Urgent', 'Critical']
    return priorities[priority] || 'Unknown'
}

export const mapPriorityToColor = (priority: number) => {
    const priorityColorsFromLowestToHighest = [
        '#d3d3d3',
        '#90ee90',
        '#ffffcc',
        '#ffd699',
        '#ff9999',
    ]
    return priorityColorsFromLowestToHighest[priority]
}