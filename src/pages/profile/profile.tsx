import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';
import { ProfileField } from '../../components/profileField/profileField';
import './profile.css';

interface ProfileInfo {
  avatar: string,
  name: string,
  lastName: string,
  login: string,
  email: string,
  phone: string,
}

const Cls = cn('profile');
export class Profile extends PureComponent {
  profileLayout(info: ProfileInfo): JSX.Element {
    return (
      <React.Fragment>
        <Avatar avatarPath={info.avatar}/>
        <legend className={Cls('legend')}>{info.name} {info.lastName}</legend>

        <ul className={Cls()}>
          {ProfileField({ description: 'Имя', name: info.name })}
          {ProfileField({ description: 'Фамилия', name: info.lastName })}
          {ProfileField({ description: 'Логин', name: info.login })}
          {ProfileField({ description: 'Почта', name: info.email })}
          {ProfileField({ description: 'Телефон', name: info.phone })}
          <li className={Cls('item')}>
            <Link to="/change-data">Изменить данные</Link>
          </li>
          <li className={Cls('item')}>
            <Link to="/change-password">Изменить пароль</Link>
          </li>
          <li className={Cls('item')}>
            <Button
              type='submit'
              onClick={() => { console.log('Выход'); }}
              text='Выйти'
            />
          </li>
        </ul>
      </React.Fragment>
    );
  }

  render():JSX.Element {
    const profileComponent = this.profileLayout({
      avatar: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
      name: 'Иван',
      lastName: 'Иванов',
      login: 'IvaN',
      email: 'ivan@ya.ru',
      phone: '+79001112233',
    });
    return (
      <main className="profilePage">
        {profileComponent}
      </main>
    );
  }
}
