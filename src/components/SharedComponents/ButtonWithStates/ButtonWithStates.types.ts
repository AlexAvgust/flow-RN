export interface ButtonWithStatesProps {
    loading: boolean
    error: boolean
    success: boolean
    label: string
    onPressFunc: () => void
}
