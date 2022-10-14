import React, {useMemo} from 'react';
import {ScrollView, Alert, useWindowDimensions, View} from 'react-native';
import CurrencySelector from './CurrencySelector';
import InputField from './InputField';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {quickQuote} from '../../services/quickQuote';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigation/AppStackNavigator';
import Button from '../../components/Button';
import {quickQuoteState} from '../../state/quickQuote';

export type IFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

const QuoteFormScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [_quote, setQuote] = useRecoilState(quickQuoteState);

  const {height, width} = useWindowDimensions();

  const isLandscape = useMemo(() => {
    return width >= height;
  }, [height, width]);

  const formSchema = zod.object({
    firstName: zod.string().min(1, {message: 'Please enter your first name'}),
    lastName: zod.string().min(1, {message: 'Please enter your last name'}),
    email: zod.union([
      zod.string().email('Please enter a valid email'),
      zod.string().length(0),
    ]),
    fromCurrency: zod
      .string()
      .min(3, {message: 'Please enter a valid currency'}),
    toCurrency: zod.string().min(3, {message: 'Please enter a valid currency'}),
    amount: zod.number().positive('Please enter a positive amount'),
  });

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      fromCurrency: 'AUD',
      toCurrency: 'USD',
      amount: 0,
    },
    resolver: zodResolver(formSchema),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    try {
      const response = await quickQuote({
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        amount: data.amount,
      });

      setQuote({
        customerRate: response.data.ComparisonRate,
        from: {
          currency: data.fromCurrency,
          amount: data.amount,
        },
        to: {
          currency: data.toCurrency,
          amount: response.data.CustomerAmount,
        },
      });

      navigation.navigate('QuoteResult');
    } catch (e) {
      Alert.alert('Something went wrong, please try again later');
    }
  };

  return (
    <ScrollView>
      <View style={[isLandscape && {flexDirection: 'row'}]}>
        <InputField
          isRequired
          title={'First Name'}
          control={control}
          errors={errors}
          name={'firstName'}
        />
        <InputField
          isRequired
          title={'Last Name'}
          control={control}
          errors={errors}
          name={'lastName'}
        />
      </View>

      <InputField
        title={'Email'}
        control={control}
        errors={errors}
        keyboardType={'email-address'}
        autocapitalize={'none'}
        name={'email'}
      />
      <View style={[isLandscape && {flexDirection: 'row'}]}>
        <CurrencySelector
          title={'From Currency'}
          control={control}
          errors={errors}
          name={'fromCurrency'}
        />
        <CurrencySelector
          title={'To Currency'}
          control={control}
          errors={errors}
          name={'toCurrency'}
        />
      </View>
      <InputField
        isRequired
        title={'Amount'}
        control={control}
        errors={errors}
        keyboardType={'numeric'}
        name={'amount'}
      />
      <Button label={'Get quote'} onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

export default QuoteFormScreen;
