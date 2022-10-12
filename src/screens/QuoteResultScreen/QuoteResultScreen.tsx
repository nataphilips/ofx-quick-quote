import React from 'react'
import { ScrollView, Text } from 'react-native'
import { useRecoilState } from 'recoil'
import { quickQuoteState } from '../../services/quickQuote'

const QuoteResultScreen = () => {
  const [quote] = useRecoilState(quickQuoteState)

  return (
    <ScrollView>
      <Text>From {quote.from.currency}</Text>
      <Text>From {quote.from.amount}</Text>

      <Text>To {quote.to.currency}</Text>
      <Text>To {quote.to.amount}</Text>
    </ScrollView>
  )
}

export default QuoteResultScreen
