import './App.css';
import PostContainer from './components/PostContainer/PostContainer';
import UsersList from './components/UsersList/UsersList';

function App(): JSX.Element {
  return (
    <div className="App">
      {/* <UsersList /> */}
      <PostContainer />
    </div>
  );
}

export default App;
