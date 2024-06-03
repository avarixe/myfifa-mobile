import React from 'react'
import { View } from 'react-native'
import { Avatar, Badge, Icon, Text } from 'react-native-paper'
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
      <Avatar.Icon icon="account" />
      <Badge
        style={{
          position: 'absolute',
          top: 0,
          right: 12
        }}
      >
        {cap.rating}
      </Badge>
      <Badge
        style={{
          position: 'absolute',
          top: 34,
          right: 12
        }}
      >
        {numGoals}
      </Badge>
      <Badge
        style={{
          position: 'absolute',
          top: 34,
          left: 12
        }}
      >
        {numAssists}
      </Badge>
      <View
        style={{
          transform: [{ rotate: '90deg' }],
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 17,
          left: 5
        }}
      >
        <Icon source="card" color="warning" size={16} />
      </View>
      <Badge
        style={{
          position: 'absolute',
          top: 0,
          left: 12
        }}
      >
        {`${cap.stop}'`}
      </Badge>
      <Text>{cap.player.name}</Text>
    </View>
  )
}
