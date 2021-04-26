import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';
import { ProfileField } from '../../components/profileField/profileField';
import UserApi from '../../api/user/user';
import './profile.css';
import { useAuthorisation } from '../../hooks/useAuthorization';

const Cls = cn('profile');
export default function Profile():JSX.Element | null {
  const { userAuthData, logoutUser } = useAuthorisation();
  const [profile, setProfile] = useState(userAuthData);

  if (!profile) return null;

  const avatarChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files[0]) {
      const data = new FormData();
      data.append('avatar', target.files[0]);
      UserApi.changeAvatar(data).then((res) => {
        if (res.avatar && profile) {
          setProfile({ ...profile, avatar: res.avatar });
        }
      });
    }
  }, []);

  return (
      <main className="profilePage">
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
            onClick={logoutUser}
            text='Выйти'
          />
        </ul>
      </main>
  );
}
