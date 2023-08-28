import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/styles/App.css';

// Import Pages
import Home from './pages/Home'
import Profile from './pages/Profile'
import Profiles from './pages/ProfilesList'
import Login from './pages/Login'
import Signup from './pages/Signup';
import SingleRecipe from './pages/SingleRecipe';
import CreateRecipePage from './pages/CreateRecipe';

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
              <Route path="/me" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/createRecipe" element={<CreateRecipePage />} />
              <Route path="singleRecipe/:recipeId" element={<SingleRecipe />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;