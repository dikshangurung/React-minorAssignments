import { useState } from 'react';
import Button from '../../ui/Button';
import { updateName } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const usernameExist = useSelector((store) => store.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <>
      {usernameExist ? (
        <Button to="/menu">Go to the cart {usernameExist}</Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>👋 Welcome! Please start by telling us your name:</p>

          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input m-8 w-72"
          />

          {username !== '' && (
            <div>
              <Button>Start ordering</Button>
            </div>
          )}
        </form>
      )}
    </>
  );
}

export default CreateUser;
