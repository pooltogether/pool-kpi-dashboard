import React, { useEffect, useState } from 'react'

import PoolTogetherLogoWhite from 'assets/images/pool-together--white-wordmark.svg'

import { fetchFromGraph } from 'lib/services/fetchFromGraph'


export const HomePane = () => {
  const [stats, setStats] = useState({
    allPlayersCount: null,
    previousPlayersCount: null,
    currentPlayersCount: null
  })

  useEffect(() => {
    async function fetchStats() {
      const response = await fetchFromGraph().catch(e => console.error(e))
      console.log(response)
      setStats(response)
    }
    fetchStats()
  }, [])
  console.log(stats)

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  return <div style={{
    backgroundColor: '#340A69',
    color: 'white',
    height: '100vh',
    margin: 0
  }}>
    <img
      src={PoolTogetherLogoWhite}
      style={{
        margin: 40
      }}
    />

    <h4>
      # Current players
    </h4>
    <h1>
      {stats.currentPlayersCount}
    </h1>

    <h4>
      # All players
    </h4>
    <h1>
      {stats.allPlayersCount}
    </h1>

    <h4>
      # Previous players
    </h4>
    <h1>
      {stats.previousPlayersCount}
    </h1>

  </div>
}
