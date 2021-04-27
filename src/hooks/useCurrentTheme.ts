import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/reducers';

export function useCurrentTheme():string {
  const theme = useSelector((state:ApplicationState) => {
    return state.theme.id;
  });
  return theme;
}
