import React, { StatelessComponent } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { connect, MapStateToProps } from 'react-redux';

import IPlace from '../../types/IPlace';
import IStore from '../../types/IStore';
import IDevices from '../../types/IDevices';
import messages from '../../lib/messages';
import { colors } from '../../constants/Theme';

import styles from './styles';
import StyledText from '../StyledText';

interface IOwnProps {
  place: IPlace;
  onPress: () => void;
}

interface IStateToProps {
  devices: IDevices;
}

type IComponentProps = IOwnProps & IStateToProps;

const requireIcon = (place: IPlace) => {
  let icon = require(`../../../assets/images/icons/unknown-dark.png`);

  if (place.iconNumber === '1') {
    icon = require(`../../../assets/images/icons/bath-dark.png`);
  } else if (place.iconNumber === '2') {
    icon = require(`../../../assets/images/icons/bed-dark.png`);
  } else if (place.iconNumber === '3') {
    icon = require(`../../../assets/images/icons/washing-dark.png`);
  } else if (place.iconNumber === '4') {
    icon = require(`../../../assets/images/icons/tv-dark.png`);
  }
  return icon;
};

const PlaceCard: StatelessComponent<IComponentProps> = ({
  place,
  onPress,
  devices,
}) => {
  const icon = requireIcon(place);
  const devicesNumber = place.devices.reduce(
    (sum: number, deviceId: string) => {
      Object.keys(devices[deviceId]).forEach(() => {
        sum += 1;
      });
      return sum;
    },
    0
  );
  return (
    <TouchableHighlight style={styles.card} onPress={onPress}>
      <View style={styles.cardBody}>
        <Image source={icon} style={styles.icon} />
        <View>
          <StyledText>{place.name}</StyledText>
          <StyledText style={{ color: colors.smoke, fontSize: 10 }}>
            {devicesNumber > 0
              ? devicesNumber
              : `${messages.without} ${messages.device}`}
          </StyledText>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IStore> = (
  state
) => {
  const devices: IDevices = state.devices;
  return { devices };
};

export default connect(mapStateToProps)(PlaceCard);
