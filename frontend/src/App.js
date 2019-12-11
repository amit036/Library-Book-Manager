import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Library_Components/Home';
import HomeStudent from './Student_Components/HomeStudent';
import ShowAllBooks from './Library_Components/ShowAllBooks';
import Add_Book from './Library_Components/Add_Book';
import Add_AuthorToBook from './Library_Components/Add_AuthorToBook';
import Add_CategoryToBook from './Library_Components/Add_CategoryToBook';
import BookDetails from './Library_Components/BookDetails';
import Add_Authors from './Library_Components/Add_Authors';
import Add_Publisher from './Library_Components/Add_Publisher';
import Add_Categories from './Library_Components/Add_Categories';
import LandingPage from './LandingPage';
import ShowSearchBook from './Student_Components/ShowSearchBook';
import SearchByAuthor from './Student_Components/SearchByAuthor';
import SearchByPublisher from './Student_Components/SearchByPublisher';
import SearchByCategory from './Student_Components/SearchByCategory';
function App() {
  return (
    <div>
    <Router>
        <Route path="/" exact render={(props) => { return <LandingPage {...props} /> }} />
        <Route path="/home-student" exact render={(props) => { return <HomeStudent {...props} /> }} />
        <Route path="/search_books_name/:bookName" exact render={(props) => { return <ShowSearchBook {...props} /> }} />
        <Route path="/search_books_author/:author_id" exact render={(props) => { return <SearchByAuthor {...props} /> }} />
        <Route path="/search_books_publisher/:publisher_id" exact render={(props) => { return <SearchByPublisher {...props} /> }} />
        <Route path="/search_books_category/:category_id" exact render={(props) => { return <SearchByCategory {...props} /> }} />
        <Route path="/home-library" exact render={(props) => { return <Home {...props} /> }} />
        <Route path="/showAllBooks" exact render={(props) => { return <ShowAllBooks {...props} /> }} />
        <Route path="/addBook" exact render={(props) => { return <Add_Book {...props} /> }} />
        <Route path="/addAuthor" exact render={(props) => { return <Add_Authors {...props} /> }} />
        <Route path="/addPublisher" exact render={(props) => { return <Add_Publisher {...props} /> }} />
        <Route path="/addCategory" exact render={(props) => { return <Add_Categories {...props} /> }} />
        <Route path="/bookDetails/:book_id" exact render={(props) => { return <BookDetails {...props} /> }} />
        <Route path="/addAuthorToBook/:book_id" exact render={(props) => { return <Add_AuthorToBook {...props} /> }} />
        <Route path="/addCategoryToBook/:book_id" exact render={(props) => { return <Add_CategoryToBook {...props} /> }} />
    </Router>
    </div>
  );
}

export default App;
