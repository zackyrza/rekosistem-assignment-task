import {useRef, type FunctionComponent, useContext} from 'react';
import {
  Animated,
  PanResponder,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import styles from './item_component.styles';
import {AvailableSlotContext} from '../../../domain/data/available_slot';
import {ReservedSlotContext} from '../../../domain/data/reserved_slot';

interface Props {
  name: string;
  style?: StyleProp<ViewStyle>;
}

export const ItemComponent: FunctionComponent<Props> = ({style, name}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const position = useRef<View>(null);

  const availableSlotContext = useContext(AvailableSlotContext);
  const reservedSlotContext = useContext(ReservedSlotContext);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // check if the item is in the available slot
        if (position.current) {
          position.current.measure((x, y, width, height, pageX, pageY) => {
            const slot1 = availableSlotContext.availableSlots.slot1;
            const slot2 = availableSlotContext.availableSlots.slot2;
            const slot3 = availableSlotContext.availableSlots.slot3;
            const slot4 = availableSlotContext.availableSlots.slot4;
            const slot5 = availableSlotContext.availableSlots.slot5;

            const widthTolerance = 5;
            const heightTolerance = 5;

            if (
              (pageX + widthTolerance > slot1.x &&
                pageX < slot1.width + slot1.x - widthTolerance &&
                pageY + heightTolerance > slot1.y + heightTolerance &&
                pageY < slot1.height + slot1.y - heightTolerance) ||
              (pageX + widthTolerance > slot2.x &&
                pageX < slot2.width + slot2.x - widthTolerance &&
                pageY + heightTolerance > slot2.y + heightTolerance &&
                pageY < slot2.height + slot2.y - heightTolerance) ||
              (pageX + widthTolerance > slot3.x &&
                pageX < slot3.width + slot3.x - widthTolerance &&
                pageY + heightTolerance > slot3.y + heightTolerance &&
                pageY < slot3.height + slot3.y - heightTolerance) ||
              (pageX + widthTolerance > slot4.x &&
                pageX < slot4.width + slot4.x - widthTolerance &&
                pageY + heightTolerance > slot4.y + heightTolerance &&
                pageY < slot4.height + slot4.y - heightTolerance) ||
              (pageX + widthTolerance > slot5.x &&
                pageX < slot5.width + slot5.x - widthTolerance &&
                pageY + heightTolerance > slot5.y + heightTolerance &&
                pageY < slot5.height + slot5.y - heightTolerance)
            ) {
              // check if the item is overlapping with other items
              const reservedSlots = reservedSlotContext.reservedSlots;
              const isOverlapping = reservedSlots.some(
                reservedSlot =>
                  pageX > reservedSlot.x &&
                  pageX < reservedSlot.x + reservedSlot.width &&
                  pageY > reservedSlot.y &&
                  pageY < reservedSlot.y + 24,
              );
              // if not overlapping, add the item to the reserved slot
              if (!isOverlapping) {
                pan.extractOffset();
                // check if this item is already on the reserved slot
                if (
                  !reservedSlotContext.reservedSlots.some(
                    item => item.name === name,
                  )
                ) {
                  reservedSlotContext.setReservedSlots([
                    ...reservedSlotContext.reservedSlots,
                    {
                      name,
                      x: pageX,
                      y: pageY,
                      width,
                    },
                  ]);
                }
              } else {
                // if overlapping, check if there are still enough space on the right
                // if there is, move the item to the right
                // if not, reset the position

                // calculate the available space on the right on the same row
                const availableSpaceOnTheRight = reservedSlots.reduce(
                  (acc, reservedSlot) => {
                    if (reservedSlot.y === pageY) {
                      return acc - reservedSlot.width;
                    }
                    return acc;
                  },
                  width,
                );
                const totalXPositionValue = reservedSlots.reduce(
                  (acc, reservedSlot) => {
                    if (reservedSlot.y === pageY) {
                      return acc + reservedSlot.x;
                    }
                    return acc;
                  },
                  0,
                );

                if (availableSpaceOnTheRight >= width) {
                  pan.setValue({x: totalXPositionValue, y: pageY});
                } else {
                  resetPosition();
                }
              }
            } else {
              resetPosition();
            }
          });
        }
      },
    }),
  ).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      ref={position}
      style={[
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
        styles.container,
        style,
      ]}
      {...panResponder.panHandlers}>
      <Text style={styles.text}>{name}</Text>
    </Animated.View>
  );
};
