const apolloFetch = require('apollo-fetch')

var fetch = apolloFetch.createApolloFetch({
  uri: process.env.NEXT_JS_GRAPHQL_ENDPOINT_URI
})
console.log(process.env.NEXT_JS_GRAPHQL_ENDPOINT_URI)

var allPlayersQuery = `
  query allPlayers($first: Int!, $skip: Int!) {
    players (first: $first, skip: $skip) {
      id
      balance
      sponsorshipBalance
    }
  }
`

var leftPlayersQuery = `
  query leftPlayers($first: Int!, $skip: Int!) {
    players (first: $first, skip: $skip, where: { balance: 0 }) {
      id
      balance
      sponsorshipBalance
    }
  }
`

async function fetchAllPlayers(query) {
  const pageSize = 1000
  let players = []
  let page = 0
  let hasMore = true
  while (hasMore) {
    page += 1
    const variables = { first: pageSize, skip: pageSize * (page-1) }
    let playersPage = await fetch({
      query,
      variables
    })
    players = players.concat(playersPage.data.players)
    hasMore = playersPage.data.players.length === pageSize
  }
  return players
}

export const fetchFromGraph = async function() {
  let allPlayersCount,
    previousPlayersCount,
    currentPlayersCount

  const allPlayers = await fetchAllPlayers(allPlayersQuery)
  if (allPlayers.length) {
    allPlayersCount = allPlayers.length
  }
  // console.log('Total Player count: ', allPlayersCount)

  const previousPlayers = await fetchAllPlayers(leftPlayersQuery)
  if (previousPlayers.length) {
    previousPlayersCount = previousPlayers.length
  }
  // console.log('Left player count: ', previousPlayersCount)

  if (previousPlayers.length && allPlayers.length) {
    currentPlayersCount = allPlayersCount - previousPlayersCount
  }
  // console.log('Current player count: ', currentPlayersCount)

  return {
    allPlayersCount,
    previousPlayersCount,
    currentPlayersCount
  }
}
