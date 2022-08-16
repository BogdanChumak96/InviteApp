import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import axios from 'axios'

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {

    axios.get('https://reqres.in/api/users')
      .then((res) => setUsers(res.data.data))
      .then(setIsLoading(false))
      .catch((err) => console.error(err))

  }, [])
  const onChangeSearchSearch = (e) => {
    setSearchValue(e.target.value)
  }
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }
  const sendInvites = () => {
    setSuccess(true)
  }
  return (
    <div className="App">
      {
        success ?
          <Success
            count={invites.length}
          /> :
          <Users
            users={users}
            isLoading={isLoading}
            searchValue={searchValue}
            onChangeSearchSearch={onChangeSearchSearch}
            invites={invites}
            onClickInvite={onClickInvite}
            sendInvites={invites && sendInvites}
          />
      }
    </div>
  );
}

export default App;
