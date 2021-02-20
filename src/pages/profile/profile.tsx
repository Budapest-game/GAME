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

function profile(info: ProfileInfo) {
  return (
    <React.Fragment>
      <div className="avatar">
        <img className="avatar__img" src={info.avatar} />
        <input className="avatar__attach" type="file" name="avatar" />
      </div>

      <legend>{info.name} {info.lastName}</legend>

      <ul className="profile-fields">
        <li className="profile-fields__item">
          <span>Имя</span>
          <span className="profile-fields__content">{info.name}</span>
        </li>

        <li className="profile-fields__item">
          <span>Фамилия</span>
          <span className="profile-fields__content">{info.lastName}</span>
        </li>

        <li className="profile-fields__item">
          <span>Логин</span>
          <span className="profile-fields__content">{info.login}</span>
        </li>

        <li className="profile-fields__item">
          <span>Почта</span>
          <span className="profile-fields__content">{info.email}</span>
        </li>

        <li className="profile-fields__item">
          <span>Телефон</span>
          <span className="profile-fields__content">{info.phone}</span>
        </li>

        <li className="profile-fields__item">
          <Link to="/changedata">Изменить данные</Link>
        </li>

        <li className="profile-fields__item">
          <Link to="/changepassword">Изменить пароль</Link>
        </li>

        <li className="profile-fields__item">
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
