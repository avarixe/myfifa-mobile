import { Avatar, Badge, Icon, Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
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
      <Avatar
        icon={{
          name: 'account',
          type: 'material-community',
          color: 'black',
          size: 40
        }}
        size="medium"
        rounded
        containerStyle={{
          backgroundColor: '#BDBDBD'
        }}
      />
      <Badge
        value={cap.rating}
        status="success"
        containerStyle={{
          position: 'absolute',
          top: 0,
          right: 12
        }}
      />
      <Badge
        value={`G${numGoals}`}
        status="primary"
        containerStyle={{
          position: 'absolute',
          top: 34,
          right: 12
        }}
      />
      <Badge
        value={`A${numAssists}`}
        status="primary"
        containerStyle={{
          position: 'absolute',
          top: 34,
          left: 12
        }}
      />
      <Badge
        value={
          <Icon
            name="card"
            type="material-community"
            color="orange"
            size={16}
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        }
        containerStyle={{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 17,
          left: 5
        }}
      />
      <Badge
        value={`${cap.stop}'`}
        status="error"
        containerStyle={{
          position: 'absolute',
          top: 0,
          left: 12
        }}
      />
      <Text>{cap.player.name}</Text>
    </View>
  )
}
