interface validationState{
  state: boolean,
  msg: string,
}

function required(value: string):validationState {
  let state = false;
  let msg = '';
  if (value.trim().length < 1) {
    state = false;
    msg = 'Поле необходимо заполнить';
  } else {
    state = true;
  }
  return { state, msg };
}
function email(value: string):validationState {
  const state = /\S+@\S+\.\S+/.test(value);
  let msg = '';
  if (!state) msg = 'Введите корректный email';
  return { state, msg };
}
function phone(value: string):validationState {
  const state = /^((8|\+7)[- ]?)?((\?\d{3})?[- ]?)?[\d- ]{7,10}$/.test(value);
  let msg = '';
  if (!state) msg = 'Введите корректный номер телефона';
  return { state, msg };
}
const validationMap:Record<string, (value: string)=>validationState> = {
  required,
  email,
  phone,
};
export function inputValidation(value: string, validationParams:string[]): validationState | never {
  for (let i = 0; i < validationParams.length; i++) {
    const key = validationParams[i];
    const fn = validationMap[key];
    if (fn) {
      const stage = fn(value);
      if (!stage.state) return stage;
    } else {
      throw new Error(`Для параметра валидации ${key} не определена функция`);
    }
  }
  return { state: true, msg: '' };
}
