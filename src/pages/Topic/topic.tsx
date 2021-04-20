import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { TopicInfo } from '../../api/types';
import './topic.css';

export interface TopicProps {
  isLoading: boolean;
  info: TopicInfo | null;
  fetchData: (id:number) => void;
}

const Cls = cn('topicPage');

export default function Topic(props: TopicProps):JSX.Element {
  const [topicInfo] = useState(0);
  const { topicId } = useParams<{ topicId: string }>();
  useEffect(() => {
    props.fetchData(parseInt(topicId, 10));
  }, [topicInfo]);

  if (props.isLoading) {
    return <>Loading...</>;
  }
  if (props.info) {
    return <div className={Cls()}>
    <div className={Cls('info')}>
      <div className={Cls('info-name')}>{props.info?.name}</div>
      <div className={Cls('info-content')}>{props.info?.content}</div>
    </div>
    <div className={Cls('comments')}>КОММЕНТЫ ТУТ</div>
  </div>;
  }
  return <>Такого топика не существует :(</>;
}
