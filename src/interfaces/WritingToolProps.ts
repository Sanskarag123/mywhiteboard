interface ActiveController {
    value: string,
    active: boolean
}
export default interface WritingToolProps {
    label: string
    toolColor?: string
    colors?: ActiveController[]
    strokeWidth?: ActiveController[]
}