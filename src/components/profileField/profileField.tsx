import React from 'react';
import { cn } from '@bem-react/classname';
import './ProfileField.css';

interface fieldInfo {
  description: string,
  name: string,
}

const Cls = cn('profile');

export function ProfileField(props: fieldInfo): JSX.Element {
  return <li className={Cls('item')}>
          <span>{props.description}</span>
          <span className={Cls('content')}>{props.name}</span>
        </li>;
}
