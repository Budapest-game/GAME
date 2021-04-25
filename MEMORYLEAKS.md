Утечка:   
  При использовании глобального EventBus,  компонент игры каждый вызов componentDidMount подписывался на ивент, но не отписывался componentWillUnmount 
Решение:    
  Добавили отписку от инвента в методе componentWillUnmount   
