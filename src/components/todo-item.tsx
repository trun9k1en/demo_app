import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Image,
} from 'react-native';

interface TodoItem {
  id: number | string;
  value: string;
  checked: boolean;
}

interface ITodoItemProps {
  todo: TodoItem;
  onDelete: () => void;
  onChange: (todo: TodoItem) => void;
}

const TodoItem = ({ todo, onDelete, onChange }: ITodoItemProps) => {
  const { width } = useWindowDimensions();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(todo.checked);
  }, [todo.checked]);

  return (
    <View style={[style.container, { width: width - 32 }]}>
      <TouchableOpacity
        onPress={() => {
          setChecked(!checked);
          onChange(todo);
        }}>
        {checked ? (
          <Image source={require('../assets/v.png')} style={style.icon} />
        ) : (
          <Image source={require('../assets/circle.png')} style={style.icon} />
        )}
      </TouchableOpacity>
      <Text
        style={[
          style.content,
          // eslint-disable-next-line react-native/no-inline-styles
          { textDecorationLine: checked ? 'line-through' : 'none' },
          // eslint-disable-next-line react-native/no-inline-styles
          { color: checked ? '#aaa' : 'black' },
        ]}>
        {todo.value}
      </Text>
      <TouchableOpacity
        onPress={() => {
          onDelete();
        }}
        style={style.deleteButton}>
        <Text style={style.deleteButtonContent}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  content: {
    textAlign: 'center',
    flex: 1,
  },
  deleteButton: {
    width: '10%',
  },
  deleteButtonContent: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});

export default TodoItem;
