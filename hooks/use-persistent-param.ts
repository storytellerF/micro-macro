import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * 通用持久化参数 hook
 * @param key 存储键名
 * @param defaultValue 默认值
 * @param options 序列化/反序列化方法
 */
export type ParamType = 'boolean' | 'number' | 'string' | 'json';

export function usePersistentParam<T>(key: string, defaultValue: T, type: ParamType) {
  let serialize: (value: T) => string;
  let deserialize: (value: string | null) => T;

  switch (type) {
    case 'boolean':
      serialize = v => (v ? 'true' : 'false');
      deserialize = v => (v === 'true') as T;
      break;
    case 'number':
      serialize = v => String(v);
      deserialize = v => (v == null ? defaultValue : Number(v)) as T;
      break;
    case 'string':
      serialize = v => (v == null ? '' : String(v));
      deserialize = v => (v == null ? defaultValue : v) as T;
      break;
    case 'json':
    default:
      serialize = v => JSON.stringify(v);
      deserialize = v => {
        if (v == null) return defaultValue;
        try {
          return JSON.parse(v);
        } catch {
          console.warn(`Failed to parse JSON from storage for key "${key}":`, v);
          return defaultValue;
        }
      };
      break;
  }

  const [value, setValue] = useState<T>(defaultValue);
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(key);
      setValue(deserialize(stored));
    })();
  }, [key]);
  const setPersistentValue = async (v: T) => {
    await AsyncStorage.setItem(key, serialize(v));
    setValue(v);
  };
  return [value, setPersistentValue] as const;
}
