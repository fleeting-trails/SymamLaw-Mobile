import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScreenContainer } from '../../components';
import CustomText from '../../atoms/CustomText/CustomText';
import { Divider } from 'react-native-paper';
import { calculateDiscount } from '../../utils/helpers';
const LibraryDetails = ({ route }: PropTypes.LibraryDetails) => {

  const { data } = route.params as { data: Store.BookListData };
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Image source={{ uri: data.book_image }} className="w-full h-60" />
        <View className='mt-2 flex-row'>
          <CustomText className="text-sm text-[#9E9E9E] bg-[#e8dcb7] px-3 py-1 rounded-full self-start font-semibold">
            {data.book_category.title}
          </CustomText>
        </View>
        <View className="w-full mt-3">
          <CustomText variant='700' className='text-lg font-bold'>{data.title}</CustomText>
          <CustomText className='mt-3'>{data.description}</CustomText>
          <Divider className='my-3' />
          <View className='flex flex-row items-center'>
            <CustomText variant='600' className='mr-2'>Author: </CustomText>
            <CustomText>{data.author}</CustomText>
          </View>
          <RenderPrice data={data} />
        </View>
      </View>
    </ScreenContainer>
  );
};


const RenderPrice = ({ data }: { data: Store.BookListData }) => {
  if (!data.discount || data.discount === 0) {
    return (
      <View className="flex flex-row items-center">
        <CustomText className="text-[#333333] font-bold">
          <CustomText variant='600' className='mr-2'>Price: </CustomText>
          <CustomText>{data.price}৳</CustomText>
        </CustomText>
      </View>
    );
  } else {
    const finalPrice = calculateDiscount(data.discount_type, data.price, data.discount);
    return (
      <View className="flex-row items-center">
        <CustomText variant='600' className='mr-2'>Price: </CustomText>
        <CustomText className="text-[#333333] line-through">
          {data.price}৳
        </CustomText>
        <CustomText className="text-[#333333] font-bold">
          {finalPrice}৳
        </CustomText>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LibraryDetails;
