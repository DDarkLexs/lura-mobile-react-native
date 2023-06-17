import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Dropdown, List } from 'react-native-paper';

export const SelectOption = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <View>
      <Dropdown
        label="Select an option"
        value={selectedValue}
        onDismiss={() => {}}
        visible={false}
        content={
          <List.Section>
            {options.map((option) => (
              <List.Item
                key={option.value}
                title={option.label}
                onPress={() => {
                  handleValueChange(option.value);
                }}
              />
            ))}
          </List.Section>
        }
      />

      <Button
        mode="contained"
        onPress={() => console.log(selectedValue)}
      >
        Submit
      </Button>
    </View>
  );

};
