import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Avatar } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';
import { ProfileField } from '../../components/profileField/profileField';
import UserApi from '../../api/user/user';
import AuthorizationApi from '../../api/auth/authorization';

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
          <ProfileField description='Имя' name={this.state.user.first_name} />
          <ProfileField description='Фамилия' name={this.state.user.second_name} />
          <ProfileField description='Логин' name={this.state.user.login} />
          <ProfileField description='Почта' name={this.state.user.email} />
          <ProfileField description='Телефон' name={this.state.user.phone} />
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
