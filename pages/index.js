import React from 'react'
import Head from 'next/head'

import { HomePane } from 'lib/components/HomePane'

import 'assets/styles/normalize-opentype.css'
import 'assets/styles/index.css'
import 'assets/styles/layout.css'
import 'assets/styles/utils.css'
import 'assets/styles/animations.css'
import 'assets/styles/loader.css'
import 'assets/styles/transitions.css'

const Home = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <HomePane />
  </>
)

export default Home
