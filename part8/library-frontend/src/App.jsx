import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import Notify from "./components/Notify";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const padding = {
    padding: 5
  }

  if (!token) {
    return (
      <div>
        <div>
          <Link style={padding} to='/authors'>authors</Link>
          <Link style={padding} to='/books'>books</Link>
          <Link style={padding} to='/login'>login</Link>
        </div>

        <Notify errorMessage={errorMessage} />

        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setError={setErrorMessage} />} />
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        <Link style={padding} to='/add'>add book</Link>
        <Link style={padding} to='/recommend'>recommend</Link>
        <button onClick={() => {
          setToken(null)
          localStorage.clear()
          client.resetStore()
        }}>logout</button>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </div>
  );
};

export default App;
