import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ sendInvites, items, isLoading, users, onChangeSearchSearch, searchValue, invites, onClickInvite }) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input value={searchValue} onChange={(e) => onChangeSearchSearch(e)} type="text" placeholder="Найти пользователя..." />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {users.filter(user => {
            const fullname = user.first_name + user.last_name
            if (fullname.toUpperCase().includes(searchValue.toUpperCase()) || user.email.toUpperCase().includes(searchValue.toUpperCase())) {
              return true
            }
          }).map(user => (
            <User
              isInvite={invites.includes(user.id)}
              key={user.id}
              user={user}
              onClickInvite={onClickInvite}
            />
          ))}
        </ul>
      )}
      {invites.length > 0 && <button onClick={sendInvites} className="send-invite-btn">Отправить приглашение</button>}
    </>
  );
};
