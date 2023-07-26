import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/styles/App.css';

// Import Pages
import Home from './pages/Home'
import Profile from './pages/Profile'
import MaterialUI from './pages/MaterialUI'
import Profiles from './pages/ProfilesList'
import Upload from './pages/Upload'
import Login from './pages/Login'

// Import Components
import Header from './components/Header'
import Footer from './components/Footer'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('id_token')
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-container">
          <Header />
          <div className="container">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/materialUI" element={<MaterialUI />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/login" element={<Login />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;