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
      setStats(response)
    }
    fetchStats()
  }, [stats])

  return <div style={{
    color: 'white',
    height: '100vh',
    margin: 0
  }}>
    <img
      src={PoolTogetherLogoWhite}
      style={{
        margin: 50
      }}
    />

    <div className='flex flex-wrap overflow-hidden sm:-mx-2 text-center w-2/3'>
      <div className='w-full overflow-hidden sm:my-2 sm:px-2 sm:w-full md:w-1/3'>
        <div
          className='font-headline mt-2 text-4xl text-green-400'
        >
          # Current players
        </div>
        <div
          className='font-bold text-10xl -mt-6'
        >
          {stats.currentPlayersCount}
        </div>
      </div>

      <div className='w-full overflow-hidden sm:my-2 sm:px-2 sm:w-full md:w-1/3'>
        <div
          className='font-headline mt-2 text-4xl text-pink-400'
        >
          # Total players
        </div>
        <div
          className='font-bold text-10xl -mt-6'
        >
          {stats.allPlayersCount}
        </div>
      </div>

      <div className='w-full overflow-hidden sm:my-2 sm:px-2 sm:w-full md:w-1/3'>
        <div
          className='font-headline mt-2 text-4xl text-pink-400'
        >
          # Previous players
        </div>
        <div
          className='font-bold text-10xl -mt-6'
        >
          {stats.previousPlayersCount}
        </div>
      </div>
    </div>

  </div>
}
