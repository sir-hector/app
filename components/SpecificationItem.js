import React from 'react'
import { Text, View } from 'react-native'

const SpecificationItem = (item) => {
  return (
     <View>
        <Text> {item.item.id}</Text>
        <Text> {item.item.contractorName}</Text>
        <Text> {item.item.identifier}</Text>
     </View>
  )
}

export default SpecificationItem