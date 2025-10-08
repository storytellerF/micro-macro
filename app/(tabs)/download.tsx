import { Button, StyleSheet, TextInput } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';

export default function DownloadScreen() {
  let [text, setText] = useState('');
  const api = async () => {
    const response = await fetch('http://127.0.0.1:5556/xhs/detail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: text,
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <ThemedView>
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 20, padding: 10 }} 
      onChange={text => setText(text.nativeEvent.text)} value={text}
      placeholder="Type here to search" />
      <Button title="Fetch Data" onPress={api} />
    </ThemedView>
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

