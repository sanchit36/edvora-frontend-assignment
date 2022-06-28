import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';

const Main = ({ siteTitle, siteDescription, user, children }) => {
  return (
    <>
      <Head>
        <title>
          {siteTitle ? siteTitle : 'Edvora - Search Your Ride Here'}
        </title>
        <meta
          name='description'
          content={
            siteDescription ? siteDescription : 'Search Your Ride With Us.'
          }
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header user={user} />
      <main className='container'>{children}</main>
    </>
  );
};

export default Main;
