import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { List, Chip } from 'react-native-paper';

//import Chips from '../../components/UI/Chips';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';
import * as favoritesActions from '../../store/actions/favorites';

const SearchScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState();
  //const [selectedChipTitle, setSelectedChipTitle] = useState('')
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.products.availableCategories);
  const [chipTitle, setChipsTitle] = useState(() => {
    let chips = [];
    for (var x in categories) {
      chips.push(categories[x].title);
    }
    return chips;
  });

  const chipSelectHandler = (text) => {
    console.log(text);
    setSelectedChip(text);
    setData([]);
  };

  const allProducts = useSelector(
    (state) => state.products.availableAllProducts,
  );
  const favoriteList = useSelector((state) => state.fav.favoritesProduct);

  let allProductsTitle = [];

  for (var x in allProducts) {
    if (selectedChip) {
      if (allProducts[x].category === selectedChip) {
        allProductsTitle = allProductsTitle.concat(allProducts[x].short_title);
      }
    } else {
      allProductsTitle = allProductsTitle.concat(allProducts[x].short_title);
    }
  }
  //console.log(allProducts);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(productActions.fetchAllProduct());
      await dispatch(favoritesActions.fetchFavorites());
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [dispatch, setError]);

  useEffect(() => {
    props.navigation.addListener('focus', loadProducts);
    return () => {
      props.navigation.removeListener('focus', loadProducts);
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const { navigation } = props;
  useEffect(() => {
    navigation.setOptions({
      title: 'Search Products',
    });
  });

  const onChangeSearch = (text) => {
    setSearchQuery(text);

    const newData = allProductsTitle.filter((item) => {
      const itemData = item.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    // console.log(newData);
    setData(newData);
  };

  const RenderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearch}
        value={searchQuery}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      {selectedChip ? (
        <View style={styles.row}>
          <Chip
            style={styles.chipSelected}
            icon='close'
            onPress={() => {
              setSelectedChip(undefined)
              setData([]);
            }}
          >
            <Text style={styles.chipText}>{selectedChip}</Text>
          </Chip>

        </View>
      ) : (
          <View style={styles.row}>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[0])}
            >
              <Text style={styles.chipText}>{chipTitle[0]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[1])}
            >
              <Text style={styles.chipText}>{chipTitle[1]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[2])}
            >
              <Text style={styles.chipText}>{chipTitle[2]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[3])}
            >
              <Text style={styles.chipText}>{chipTitle[3]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[4])}
            >
              <Text style={styles.chipText}>{chipTitle[4]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[5])}
            >
              <Text style={styles.chipText}>{chipTitle[5]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[6])}
            >
              <Text style={styles.chipText}>{chipTitle[6]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[7])}
            >
              <Text style={styles.chipText}>{chipTitle[7]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[8])}
            >
              <Text style={styles.chipText}>{chipTitle[8]}</Text>
            </Chip>
            <Chip
              style={styles.chip}
              //type='outlined'
              onPress={chipSelectHandler.bind(this, chipTitle[9])}
            >
              <Text style={styles.chipText}>{chipTitle[9]}</Text>
            </Chip>
          </View>
        )}

      <FlatList
        style={styles.searchList}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={RenderSeparator}
        renderItem={({ item }) => (
          <List.Item
            title={item}
            onPress={() => {
              const itemData = allProducts.filter((prod) => {
                return prod.short_title === item;
              });

              let variable = 'false';
              for (var x in favoriteList) {
                if (favoriteList[x].favProductId === itemData[0].id) {
                  variable = 'true';
                }
              }

              props.navigation.navigate('ProductDetailScreen', {
                productId: itemData[0].id,
                variable: variable,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
    fontSize: Dimensions.get('window').width > 400 ? 15 : 12,
  },
  searchContainer: {
    margin: 20,
  },
  searchList: {
    marginHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //paddingHorizontal: 10
  },
  chip: {
    backgroundColor: Colors.background,
    margin: 5
  },
  chipSelected: {
    // backgroundColor: Colors.background,
    margin: 5,
  },
  chipText: {
    color: Colors.primary
  }
});

export default SearchScreen;
