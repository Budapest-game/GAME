import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';
import UserApi from '../../api/user/user';
import AuthorizationApi from '../../api/auth/authorization';
import './profile.css';

interface ProfileInfo {
  avatar: string,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string,
}
interface ProfileState{
  loading: boolean,
  user: ProfileInfo
}

const Cls = cn('profile');
class Profile extends PureComponent<RouteComponentProps> {
  state:ProfileState = {
    loading: true,
    user: {
      avatar: '',
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      phone: '',
    },
  }

  componentDidMount():void {
    UserApi.get().then((res) => {
      this.setState({ ...this.state, user: res, loading: false });
    });
  }

  redirectToLogin = ():void => {
    const { history } = this.props;
    if (history) history.push('/authorization');
  }

  logOut = ():void => {
    AuthorizationApi.logOut().then(() => {
      this.redirectToLogin();
    });
  }

  avatarChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files[0]) {
      const data = new FormData();
      data.append('avatar', target.files[0]);
      UserApi.changeAvatar(data).then((res) => {
        if (res.avatar !== null) {
          this.setState({ user: { ...this.state.user, avatar: res.avatar } });
        }
      });
    }
  }

  profileLayout(): JSX.Element {
    return (
      <React.Fragment>
        <Avatar avatarPath={this.state.user.avatar} onChange={this.avatarChange}/>
        <legend className={Cls('legend')}>{this.state.user.first_name} {this.state.user.second_name}</legend>

        <ul className={Cls()}>
          <li className={Cls('item')}>
            <span>Имя</span>
            <span className={Cls('content')}>{this.state.user.first_name}</span>
          </li>

          <li className={Cls('item')}>
            <span>Фамилия</span>
            <span className={Cls('content')}>{this.state.user.second_name}</span>
          </li>

          <li className={Cls('item')}>
            <span>Логин</span>
            <span className={Cls('content')}>{this.state.user.login}</span>
          </li>

          <li className={Cls('item')}>
            <span>Почта</span>
            <span className={Cls('content')}>{this.state.user.email}</span>
          </li>

          <li className={Cls('item')}>
            <span>Телефон</span>
            <span className={Cls('content')}>{this.state.user.phone}</span>
          </li>

          <li className={Cls('item')}>
            <Link to="/change-data">Изменить данные</Link>
          </li>

          <li className={Cls('item')}>
            <Link to="/change-password">Изменить пароль</Link>
          </li>

          <li className={Cls('item')}>
            <Button
              type='submit'
              onClick={this.logOut}
              text='Выйти'
            />
          </li>
        </ul>
      </React.Fragment>
    );
  }

  render():JSX.Element {
    const profileComponent = this.profileLayout();
    return (
      <main className="profilePage">
        {
         this.state.loading ? <span>Загрузка</span> : profileComponent
        }
      </main>
    );
  }
}
export default withRouter(Profile);
