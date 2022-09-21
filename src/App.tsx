import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import TodoItem from './components/todo-item';

/**
 * Requirement:
 * - Thêm note [Done]
 * - Xóa [Done]
 * - Đánh dấu/bỏ đánh dấu đã hoàn thành
 * - Hiện list công việc [Done]
 *
 * Take note:
 * - Không được để inline-style
 */

interface TodoItemData {
  id: number | string;
  value: string;
  checked: boolean;
}

const App = () => {
  const { width } = useWindowDimensions();

  const [todos, setTodos] = useState<TodoItemData[]>([]);
  const [value, setValue] = useState('');

  console.log(todos);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>todos</Text>
      </View>
      <View style={styles.todoInput}>
        <TouchableOpacity
          onPress={() =>
            setTodos(todos.map(x => ({ ...x, checked: !x.checked })))
          }>
          <Image
            source={require('./assets/downarrow.png')}
            style={styles.downArrow}
          />
        </TouchableOpacity>
        <TextInput
          value={value}
          onChangeText={text => setValue(text)}
          placeholder="What needs to do"
        />
      </View>
      <TouchableOpacity
        disabled={!value}
        style={[
          styles.addButton,
          // eslint-disable-next-line react-native/no-inline-styles
          { opacity: value ? 1 : 0.3, width: width - 32 },
        ]}
        onPress={() => {
          setTodos([
            ...todos,
            { id: Math.random().toString(), value, checked: false },
          ]);
          setValue('');
        }}>
        <Text style={styles.addButtonTitle}>Add</Text>
      </TouchableOpacity>
      <View style={styles.todoListWrapper}>
        {todos.map((todo: TodoItem) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => {
                const taskRemain = todos.filter(x => x.id !== todo.id);
                setTodos(taskRemain);
              }}
              onChange={_todo => {
                setTodos(prevState => {
                  const prevStateClone = [...prevState];
                  const index = todos.findIndex(x => x.id === _todo.id);
                  prevState[index].checked = !_todo.checked;
                  return prevStateClone;
                });
              }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '300',
    color: 'grey',
    fontStyle: 'italic',
  },
  todoInput: {
    borderWidth: 1,
    borderColor: '#F3F3F3',
    backgroundColor: '#F3f3f3',
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  addButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'red',
    marginTop: 16,
  },
  addButtonTitle: {
    color: 'red',
  },
  todoListWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  downArrow: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
});

export default App;
