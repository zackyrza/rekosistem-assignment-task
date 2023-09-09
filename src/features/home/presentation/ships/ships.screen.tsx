import React, {useMemo, useState} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import styles from './ships.styles';
import {ItemComponent} from './components/item_component';
import {
  IReservedSlot,
  ReservedSlotContext,
} from '../../domain/data/reserved_slot';
import {
  AvailableSlotContext,
  IAvailableSlot,
  IAvailableSlots,
} from '../../domain/data/available_slot';

const availableSlotDefaultValue = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const Ships = () => {
  const slot1Ref = React.useRef<View>(null);
  const slot2Ref = React.useRef<View>(null);
  const slot3Ref = React.useRef<View>(null);
  const slot4Ref = React.useRef<View>(null);
  const slot5Ref = React.useRef<View>(null);

  const [data, setData] = useState([
    'B2222IKN',
    'A3590LMN',
    'C5543KKP',
    'A5555KYT',
    'B1ND',
    'A9OK',
    'B247882930PPP',
    'B3374892KH',
    'K738971843789KH',
    'R3852123LL',
  ]);

  const [availableSlots, setAvailableSlots] = useState<IAvailableSlots>({
    slot1: availableSlotDefaultValue,
    slot2: availableSlotDefaultValue,
    slot3: availableSlotDefaultValue,
    slot4: availableSlotDefaultValue,
    slot5: availableSlotDefaultValue,
  });
  const [reservedSlots, setReservedSlots] = useState<IReservedSlot[]>([]);

  const setSlotPosition = () => {
    Promise.all([
      new Promise<IAvailableSlot>(resolve => {
        slot1Ref.current?.measure((x, y, width, height, pageX, pageY) => {
          resolve({x: pageX, y: pageY, width, height});
        });
      }),
      new Promise<IAvailableSlot>(resolve => {
        slot2Ref.current?.measure((x, y, width, height, pageX, pageY) => {
          resolve({x: pageX, y: pageY, width, height});
        });
      }),
      new Promise<IAvailableSlot>(resolve => {
        slot3Ref.current?.measure((x, y, width, height, pageX, pageY) => {
          resolve({x: pageX, y: pageY, width, height});
        });
      }),
      new Promise<IAvailableSlot>(resolve => {
        slot4Ref.current?.measure((x, y, width, height, pageX, pageY) => {
          resolve({x: pageX, y: pageY, width, height});
        });
      }),
      new Promise<IAvailableSlot>(resolve => {
        slot5Ref.current?.measure((x, y, width, height, pageX, pageY) => {
          resolve({x: pageX, y: pageY, width, height});
        });
      }),
    ]).then(values => {
      const [slot1, slot2, slot3, slot4, slot5] = values;
      setAvailableSlots({
        slot1,
        slot2,
        slot3,
        slot4,
        slot5,
      });
    });
  };

  React.useEffect(() => {
    setSlotPosition();
  }, []);

  const isReady = useMemo(
    () =>
      Object.values(availableSlots).every(
        slot => slot !== availableSlotDefaultValue,
      ),
    [availableSlots],
  );

  const reservedContextValue = useMemo(
    () => ({
      reservedSlots,
      setReservedSlots,
    }),
    [reservedSlots],
  );

  const availableContextValue = useMemo(
    () => ({
      availableSlots,
      setAvailableSlots,
    }),
    [availableSlots],
  );

  return (
    <GestureHandlerRootView style={styles.parent}>
      <ReservedSlotContext.Provider value={reservedContextValue}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../../../assets/images/ships_bg.png')}
            style={styles.image}
            resizeMode="stretch">
            <View style={styles.slotRow1} ref={slot1Ref} />
            <View style={styles.slotRow2} ref={slot2Ref} />
            <View style={styles.slotRow3} ref={slot3Ref} />
            <View style={styles.slotRow4} ref={slot4Ref} />
            <View style={styles.slotRow5} ref={slot5Ref} />
          </ImageBackground>
        </View>
        <View style={styles.list}>
          <AvailableSlotContext.Provider value={availableContextValue}>
            {isReady &&
              data.map((item, index) => (
                <ItemComponent key={index} name={item} />
              ))}
          </AvailableSlotContext.Provider>
        </View>
      </ReservedSlotContext.Provider>
    </GestureHandlerRootView>
  );
};

export default Ships;
