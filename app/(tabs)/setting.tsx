import { ParamType, usePersistentParam } from '@/hooks/use-persistent-param';
import { Image } from 'expo-image';
import { StyleSheet, Switch } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SettingScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <SkipDownloaded />
    </ParallaxScrollView>
  );
}



type PersistentParamSwitchProps = {
  label: string;
  paramKey: string;
  defaultValue: boolean;
};

function PersistentParamSwitch(props: PersistentParamSwitchProps) {
  const { label, paramKey, defaultValue } = props;
  const [value, setValue] = usePersistentParam(paramKey, defaultValue, 'boolean');
  return (
    <ThemedView>
      <ThemedText>{label}</ThemedText>
      <Switch value={value} onValueChange={v => setValue(v)} />
    </ThemedView>
  );
}

function SkipDownloaded() {
  return (
    <PersistentParamSwitch
      label="Skip Download"
      paramKey="skipDownloaded"
      defaultValue={false}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
