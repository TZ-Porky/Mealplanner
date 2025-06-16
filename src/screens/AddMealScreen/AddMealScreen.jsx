/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function AddMealScreen() {
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [servings, setServings] = useState('');
  const [budget, setBudget] = useState('');
  const [difficulty, setDifficulty] = useState();
  const [category, setCategory] = useState();
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Easy', 'Beginner', '5min', 'FastFood']);
  const [cookwareInput, setCookwareInput] = useState('');
  const [cookwareQty, setCookwareQty] = useState('');
  const [cookwareList, setCookwareList] = useState([
    {name: 'Pot', quantity: 28},
    {name: 'Spoon', quantity: 12},
    {name: 'Knife', quantity: 1},
  ]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');
  const [ingredientList, setIngredientList] = useState([
    {name: 'Tomatoes', quantity: 28},
    {name: 'Cheese', quantity: 12},
    {name: 'Slice of Bread', quantity: 28},
  ]);
  const [stepDescription, setStepDescription] = useState('');
  const [stepDuration, setStepDuration] = useState('');
  const [steps, setSteps] = useState([
    {description: 'First step to cook the meal', duration: 1},
    {description: 'Second step to cook the meal', duration: 2},
    {description: 'Third step to cook the meal', duration: 3},
  ]);

  const addTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = index => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const addCookware = () => {
    if (cookwareInput && cookwareQty) {
      setCookwareList([
        ...cookwareList,
        {name: cookwareInput, quantity: cookwareQty},
      ]);
      setCookwareInput('');
      setCookwareQty('');
    }
  };

  const removeCookware = index => {
    const newList = [...cookwareList];
    newList.splice(index, 1);
    setCookwareList(newList);
  };

  const addIngredient = () => {
    if (ingredientInput && ingredientQty) {
      setIngredientList([
        ...ingredientList,
        {name: ingredientInput, quantity: ingredientQty},
      ]);
      setIngredientInput('');
      setIngredientQty('');
    }
  };

  const removeIngredient = index => {
    const newList = [...ingredientList];
    newList.splice(index, 1);
    setIngredientList(newList);
  };

  const addStep = () => {
    if (stepDescription && stepDuration) {
      setSteps([
        ...steps,
        {description: stepDescription, duration: stepDuration},
      ]);
      setStepDescription('');
      setStepDuration('');
    }
  };

  const removeStep = index => {
    const newList = [...steps];
    newList.splice(index, 1);
    setSteps(newList);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Meal</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter recipe title"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.row}>
        <TextInput
          style={styles.timeInput}
          value={hours}
          onChangeText={setHours}
        />
        <TextInput
          style={styles.timeInput}
          value={minutes}
          onChangeText={setMinutes}
        />
        <TextInput
          style={styles.timeInput}
          value={seconds}
          onChangeText={setSeconds}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Number of Servings"
          value={servings}
          onChangeText={setServings}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Budget"
          value={budget}
          onChangeText={setBudget}
        />
      </View>

      <Picker
        selectedValue={difficulty}
        onValueChange={setDifficulty}
        style={styles.picker}>
        <Picker.Item label="Select a difficulty" value={null} />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}>
        <Picker.Item label="Select a Category" value={null} />
        <Picker.Item label="Main Course" value="main" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => removeTag(index)}>
            <Text style={styles.tag}>{tag} ✕</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new tag"
          value={tagInput}
          onChangeText={setTagInput}
        />
        <TouchableOpacity onPress={addTag} style={styles.addBtn}>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subheader}>Cookware</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Select the cookware"
          value={cookwareInput}
          onChangeText={setCookwareInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={cookwareQty}
          onChangeText={setCookwareQty}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={addCookware} style={styles.addBtn}>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>
      {cookwareList.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text>{item.name}</Text>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => removeCookware(index)}>
            <Text>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.subheader}>Ingredients</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Select an ingredient"
          value={ingredientInput}
          onChangeText={setIngredientInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={ingredientQty}
          onChangeText={setIngredientQty}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={addIngredient} style={styles.addBtn}>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>
      {ingredientList.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text>{item.name}</Text>
          <Text>{item.quantity} KG</Text>
          <TouchableOpacity onPress={() => removeIngredient(index)}>
            <Text>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.subheader}>Cooking Steps</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter Step Description"
          value={stepDescription}
          onChangeText={setStepDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration"
          value={stepDuration}
          onChangeText={setStepDuration}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={addStep} style={styles.addBtn}>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>
      {steps.map((step, index) => (
        <View key={index} style={styles.listItem}>
          <Text>{step.description}</Text>
          <Text>{step.duration} Min</Text>
          <TouchableOpacity onPress={() => removeStep(index)}>
            <Text>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={[styles.btnText, {color: '#f1731a'}]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishBtn}>
          <Text style={styles.btnText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f1731a',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f3c09e',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#f3c09e',
    borderRadius: 10,
    padding: 10,
    width: 60,
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#f3c09e',
    borderRadius: 10,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#f3c09e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fef3eb',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#fef3eb',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  finishBtn: {
    backgroundColor: '#f1731a',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#f3c09e',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
