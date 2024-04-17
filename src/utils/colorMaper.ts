export const mapPriorityToColor = (priority: number) => {
    const priorityColorsFromLowestToHighest = ['#d3d3d3', '#90ee90', '#ffffcc', '#ffd699', '#ff9999']
    return priorityColorsFromLowestToHighest[priority]
}