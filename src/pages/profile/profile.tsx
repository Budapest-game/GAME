import React, { PureComponent } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
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

function profile(info: ProfileInfo): JSX.Element {
  const Cls = cn('profile');
  const Avatar = cn('avatar');
  return (
    <React.Fragment>
      <div className={Avatar()}>
        <img className={Avatar('img')} src={info.avatar} />
        <input className={Avatar('attach')} type="file" name="avatar" />
      </div>

      <legend>{info.name} {info.lastName}</legend>

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

export class Profile extends PureComponent {
  makeProfileData():JSX.Element {
    const profileInfo = profile({
      avatar: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
      name: 'Иван',
      lastName: 'Иванов',
      login: 'IvaN',
      email: 'ivan@ya.ru',
      phone: '+79001112233',
    });

    return profileInfo;
  }

  render():JSX.Element {
    const profileComponent = this.makeProfileData();
    return (
      <main className="profilePage">
        {profileComponent}
      </main>
    );
  }
}
