import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';
import { ProfileField } from '../../components/profileField/profileField';
import UserApi from '../../api/user/user';
import './profile.css';
import { useAuthorisation } from '../../hooks/useAuthorization';

const Cls = cn('profile');
export default function Profile():JSX.Element {
  const { userAuthData, logoutUser } = useAuthorisation();
  const [profile, setProfile] = useState(userAuthData);

  const handleLogout = ():void => {
    logoutUser();
  };

  const avatarChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files[0]) {
      const data = new FormData();
      data.append('avatar', target.files[0]);
      UserApi.changeAvatar(data).then((res) => {
        if (res.avatar !== null && profile !== undefined) {
          setProfile({ ...profile, avatar: res.avatar });
        }
      });
    }
  };

  const ProfileLayout = (): JSX.Element => {
    if (profile) {
      return (
      <React.Fragment>
        <Avatar avatarPath={profile.avatar} onChange={avatarChange}/>
        <legend className={Cls('legend')}>{profile.first_name} {profile.second_name}</legend>

        <ul className={Cls()}>
          <ProfileField description='Имя' name={profile.first_name} />
          <ProfileField description='Фамилия' name={profile.second_name} />
          <ProfileField description='Логин' name={profile.login} />
          <ProfileField description='Почта' name={profile.email} />
          <ProfileField description='Телефон' name={profile.phone} />
          <li className={Cls('item')}>
            <Link to="/change-data">Изменить данные</Link>
          </li>
          <li className={Cls('item')}>
            <Link to="/change-password">Изменить пароль</Link>
          </li>
          <Button
            type='submit'
            onClick={handleLogout}
            text='Выйти'
          />
        </ul>
      </React.Fragment>
      );
    }
    throw new Error('В хранилище нет данных пользователя');
  };

  return (
      <main className="profilePage">
        <ProfileLayout/>
      </main>
  );
}
