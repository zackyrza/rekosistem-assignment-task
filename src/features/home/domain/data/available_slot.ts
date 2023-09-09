import { createContext } from "react";

export interface IAvailableSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IAvailableSlots {
  slot1: IAvailableSlot;
  slot2: IAvailableSlot;
  slot3: IAvailableSlot;
  slot4: IAvailableSlot;
  slot5: IAvailableSlot;
}

export interface IAvailableSlotContext {
  availableSlots: IAvailableSlots;
  setAvailableSlots: (availableSlots: IAvailableSlots) => void;
}

export const AvailableSlotContext = createContext<IAvailableSlotContext>({
  availableSlots: {
    slot1: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    slot2: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    slot3: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    slot4: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    slot5: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  },
  setAvailableSlots: (availableSlots: IAvailableSlots) => {},
});