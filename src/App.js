import React, {useEffect, useState} from 'react';
import Recipe from "./recipe";
import logo from './logo.svg';
import './App.css';


const App = ()=>{
  const APP_ID = "dda1380d";
  const APP_KEY = "39d4947b9d1a4c3d71098b66d2c063cf";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState();
  const [query, setQuery] = useState('chicken');

  useEffect( ()=>{
    getRecipies();
  }, [query]);

  const getRecipies = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e=>{
    e.preventDefault(); 
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value = {search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe  
          key = {recipe.recipe.calories}
          title={recipe.recipe.label} 
          calories ={recipe.recipe.calories} 
          image = {recipe.recipe.image}
          />
      )
       )}
    </div>
  )

}

export default App;
