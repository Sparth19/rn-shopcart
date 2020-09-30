import React, {useReducer, useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';

const FORM_UPDATE_REDUCER = 'FORM_UPDATE_REDUCER';

const formReducer = (state, action) => {
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
  return state;
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const {productId} = props.route.params;

  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId),
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : '',
      imageUrl: selectedProduct ? selectedProduct.imageUrl : '',
      description: selectedProduct ? selectedProduct.description : '',
      price: '',
    },

    inputValidities: {
      title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      description: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
    },

    formIsValid: selectedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occurred', error, [{text: 'Okay'}]);
    }
  }, [error]);

  // useEffect(() => {
  //   props.navigation.setParams({ submit: saveProductHandler });
  // }, [saveProductHandler]);
  const {navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      title: productId ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={() => {
              saveProductHandler();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const saveProductHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid Input', 'Please enter valid input', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (selectedProduct) {
        //edited product
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
          ),
        );
      } else {
        //new product  (+)  in price for num value
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description,
          ),
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError('Something went wrong');
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  const inputChangeHandler = useCallback(
    (identifier, inputValue, inputValidity) => {
      //console.log(inputValue);
      dispatchFormState({
        type: FORM_UPDATE_REDUCER,
        value: inputValue,
        isValid: inputValidity,
        input: identifier,
      });
    },
    [dispatchFormState],
  );

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
        {selectedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorMessage="Please enter valid price"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
          />
        )}
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
      </View>
    </ScrollView>
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
});
export default EditProductScreen;
