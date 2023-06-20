import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, Switch,View } from 'react-native';
import { DataTable } from 'react-native-paper';

const data = [
  { nome: 'Item 1', dataValidade: '01/01/2023', expirado: false },
  { nome: 'Item 2', dataValidade: '02/02/2023', expirado: true },
  // Adicione mais objetos de dados conforme necessário
  // ...
];

export const Vigencia = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [showExpired, setShowExpired] = useState(true);

  const handleFilter = filterQuery => {
    const lowerCaseQuery = filterQuery.toLowerCase();
    const filteredItems = data.filter(item =>
      item.nome.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filteredItems);
  };

  const handleToggleSwitch = () => {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    const filteredItems = showExpired
      ? data.filter(item => item.expirado)
      : data.filter(item => !item.expirado);

    setFilteredData(filteredItems);
  }, [showExpired]);

  return (
    <ScrollView style={styles.container}>
        <View style={styles.switch}>

      <Switch
        
        value={showExpired}
        onValueChange={handleToggleSwitch}
        />
        </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>Data de Validade</DataTable.Title>
          <DataTable.Title>Validade</DataTable.Title>
        </DataTable.Header>

        {filteredData.map(item => (
          <DataTable.Row key={item.nome}>
            <DataTable.Cell>{item.nome}</DataTable.Cell>
            <DataTable.Cell>{item.dataValidade}</DataTable.Cell>
            <DataTable.Cell>
              {item.expirado ? 'Expirado' : 'Válido'}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          totalItems={filteredData.length}
          itemsPerPage={10}
          onChangePage={page => console.log(page)}
          label="1-10 de 20"
        />
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switch: {
    alignSelf: 'flex-start',
    marginRight: 20,
    marginTop: 10,
  },
});