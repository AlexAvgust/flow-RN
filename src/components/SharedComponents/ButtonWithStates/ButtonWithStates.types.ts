export type ButtonWithStatesProps =Partial<NetworkState> & {
    label: string
    onPressFunc: () => void
}

type NetworkState = {
    loading: boolean
    error: boolean
    success: boolean
}