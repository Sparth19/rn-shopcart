import React, { useReducer, useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  Text,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';

import { Picker } from '@react-native-community/picker';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';

const FORM_UPDATE_REDUCER = 'FORM_UPDATE_REDUCER';

const formReducer = (state, action) => {
  // console.log('in form ');
  //console.log(action.value);
  if (action.type === FORM_UPDATE_REDUCER) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  //return state;
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { productId } = props.route.params;
  //console.log('product id : ' + productId);
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId),
  );
  const [category, setCategory] = useState(
    selectedProduct ? selectedProduct.category : '',
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : '',
      short_title: selectedProduct ? selectedProduct.short_title : '',
      imageUrl: selectedProduct ? selectedProduct.imageUrl : '',
      description: selectedProduct ? selectedProduct.description : '',
      price: selectedProduct ? selectedProduct.price : '',
    },

    inputValidities: {
      title: selectedProduct ? true : false,
      short_title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      description: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
    },

    formIsValid: selectedProduct ? true : false,
  });
  //console.log(formState);

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  // useEffect(() => {
  //   props.navigation.setParams({submit: saveProductHandler});
  // }, [saveProductHandler]);

  const saveProductHandler = useCallback(async () => {
    // console.log(formState);
    if (!formState.formIsValid) {
      Alert.alert('Invalid Input', 'Please enter valid input', [
        { text: 'Okay' },
      ]);
      return;
    }

    if (category === '') {
      Alert.alert('Invalid Input', 'Please select category', [{ text: 'Okay' }]);
      return;
    }

    setError(null);
    setIsLoading(true);
    //console.log(category);
    try {
      if (selectedProduct) {
        //edited product
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.short_title,
            formState.inputValues.imageUrl,
            formState.inputValues.price,
            formState.inputValues.description,
            category,
          ),
        );
      } else {
        //new product  (+)  in price for num value
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.short_title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description,
            category,
          ),
        );
      }
      setIsLoading(false);
      props.navigation.goBack();
    } catch (err) {
      setIsLoading(false);
      setError('Something went wrong' + err);
    }
  }, [dispatch, formState, category]);

  const inputChangeHandler = useCallback(
    (identifier, inputValue, inputValidity) => {
      // console.log(inputValue);
      dispatchFormState({
        type: FORM_UPDATE_REDUCER,
        value: inputValue,
        isValid: inputValidity,
        input: identifier,
      });
    },
    [dispatchFormState],
  );
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      title: productId ? 'Edit Product' : 'Add Product',
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //     <Item
      //       title="Save"
      //       iconName={
      //         Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
      //       }
      //       onPress={saveProductHandler}
      //     />
      //   </HeaderButtons>
      // ),
    });
  }, [navigation, saveProductHandler]);

  if (isLoading) {
    return (
      <View style={styles.spinnerCenter}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior="padding"
    //   //keyboardVerticalOffset={1}
    // >
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <Input
            id="title"
            label="Title"
            errorMessage="Please enter valid title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.title : ''}
            initiallyValid={!!selectedProduct}
            required
          />
          <Input
            id="short_title"
            label="Short Title"
            errorMessage="Please enter valid mini title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.short_title : ''}
            initiallyValid={!!selectedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image url"
            errorMessage="Please enter valid image url"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.imageUrl : ''}
            initiallyValid={!!selectedProduct}
            required
          />
          <Input
            id="price"
            label="Price"
            errorMessage="Please enter valid price"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.price : ''}
            initiallyValid={!!selectedProduct}
            required
          />
          <Input
            id="description"
            label="Description"
            errorMessage="Please enter valid description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="done"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={selectedProduct ? selectedProduct.description : ''}
            initiallyValid={!!selectedProduct}
            required
          />
          <Text style={styles.text}>Select Category</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item label="Electronics" value="Electronics" />
              <Picker.Item label="Home" value="Home" />
              <Picker.Item label="Fashion" value="Fashion" />
              <Picker.Item label="Footwear" value="Footwear" />
              <Picker.Item label="Books" value="Books" />
              <Picker.Item label="Mobiles" value="Mobiles" />
              <Picker.Item label="Appliances" value="Appliances" />
              <Picker.Item label="Beauty" value="Beauty" />
              <Picker.Item label="Sports" value="Sports" />
              <Picker.Item label="Toys & Baby" value="Toys & Baby" />
            </Picker>
          </View>
          <View style={styles.button}>
            <Button
              title="Save Product"
              color={Colors.accent}
              onPress={saveProductHandler}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    //borderWidth: 1,
    padding: 10,
    // borderColor: "#ccc",
    // borderRadius: 5,
  },
  spinnerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pickerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    marginVertical: 5,
    fontSize: Dimensions.get('window').width > 400 ? 18 : 14,
  },
  picker: {
    width: '100%',
  },
  item: {
    fontSize: 10,
  },
  button: {
    alignItems: 'center',
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: Colors.accent,
    padding: 10,
    margin: 10,
  },
});
export default EditProductScreen;
