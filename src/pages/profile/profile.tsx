import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';
import './profile.css';

interface ProfileInfo {
  avatar: string,
  name: string,
  lastName: string,
  login: string,
  email: string,
  phone: string,
}

export class Profile extends PureComponent {
  profileLayout(info: ProfileInfo): JSX.Element {
    const Cls = cn('profile');
    return (
      <React.Fragment>
        <Avatar avatarPath={info.avatar}/>
        <legend className={Cls('legend')}>{info.name} {info.lastName}</legend>

        <ul className={Cls()}>
          <li className={Cls('item')}>
            <span>Имя</span>
            <span className={Cls('content')}>{info.name}</span>
          </li>

          <li className={Cls('item')}>
            <span>Фамилия</span>
            <span className={Cls('content')}>{info.lastName}</span>
          </li>

          <li className={Cls('item')}>
            <span>Логин</span>
            <span className={Cls('content')}>{info.login}</span>
          </li>

          <li className={Cls('item')}>
            <span>Почта</span>
            <span className={Cls('content')}>{info.email}</span>
          </li>

          <li className={Cls('item')}>
            <span>Телефон</span>
            <span className={Cls('content')}>{info.phone}</span>
          </li>

          <li className={Cls('item')}>
            <Link to="/changedata">Изменить данные</Link>
          </li>

          <li className={Cls('item')}>
            <Link to="/changepassword">Изменить пароль</Link>
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
