import React from 'react';
import { cn } from '@bem-react/classname';
import './profileField.css';

interface fieldInfo {
  description: string,
  name: string,
}

const Cls = cn('profile');

export function ProfileField(info: fieldInfo): JSX.Element {
  return <li className={Cls('item')}>
          <span>{info.description}</span>
          <span className={Cls('content')}>{info.name}</span>
        </li>;
}
