import { createContext } from 'react'

export interface IReservedSlot {
    name: string
    width: number
    x: number
    y: number
}

export interface IReservedSlotContext {
    reservedSlots: IReservedSlot[],
    setReservedSlots: (reservedSlots: IReservedSlot[]) => void
}

export const ReservedSlotContext = createContext<IReservedSlotContext>({
    reservedSlots: [],
    setReservedSlots: () => { }
});

