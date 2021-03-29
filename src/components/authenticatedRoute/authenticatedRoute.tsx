import { useSelector } from 'react-redux';
import RedirectRoute, { AdvancedRoute } from '../redirectRoute/redirectRoute';
import { ApplicationState } from '../../index';

export default function AuthenticatedRoute(props:AdvancedRoute): JSX.Element | null {
  const isAuthenticated = useSelector((state:ApplicationState) => {
    return state.auth.isAuthenticated;
  });
  return RedirectRoute({ redirectFlag: !isAuthenticated, ...props });
}
