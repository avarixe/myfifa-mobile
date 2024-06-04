import React from 'react'
import { View } from 'react-native'
import { Avatar, Icon, Text } from 'react-native-paper'
import { Cap, Match } from 'types'

export const CapView: React.FC<{
  match: Match
  cap: Cap
}> = ({ match, cap }) => {
  const numGoals = match.goals.filter(
    goal => goal.capId === cap.id && !goal.ownGoal
  ).length
  const numAssists = match.goals.filter(
    goal => goal.assistCapId === cap.id
  ).length

  return (
    <View style={{ width: 80, alignItems: 'center' }}>
      <Avatar.Icon icon="account" style={{ backgroundColor: '#BDBDBD' }} />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 12
        }}
      >
        <Icon source="arrow-right-bottom-bold" color="green" size={16} />
        <Text>{cap.start}'</Text>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          top: 0,
          right: 12
        }}
      >
        <Icon source="arrow-up-right-bold" color="red" size={16} />
        <Text>{cap.stop}'</Text>
      </View>
      <View
        style={{
          transform: [{ rotate: '90deg' }],
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 24,
          left: 0
        }}
      >
        <Icon source="card" color="orange" size={16} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 24,
          right: 0
        }}
      >
        <Icon
          source={
            cap.rating ? `numeric-${cap.rating}-circle` : 'star-four-points'
          }
          color="yellow"
          size={16}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 48,
          right: 12
        }}
      >
        <Icon source="soccer" color="blue" size={16} />
        <Text>{numGoals}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 48,
          left: 12
        }}
      >
        <Icon source="shoe-cleat" color="cyan" size={16} />
        <Text>{numAssists}</Text>
      </View>
      <Text style={{ fontSize: 10 }}>{cap.player.name}</Text>
    </View>
  )
}
