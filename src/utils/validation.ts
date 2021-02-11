type val = string | undefined;

function required(value: val):boolean {
  if (value === undefined) return false;
  if (value.length < 1) return false;
  return true;
}
function email(value: val):boolean {
  if (value === undefined) return false;
  return /\S+@\S+\.\S+/.test(value);
}
function phone(value: val):boolean {
  if (value === undefined) return false;
  return /^((8|\+7)[- ]?)?((\?\d{3})?[- ]?)?[\d- ]{7,10}$/.test(value);
}
const validationMap:Record<string, (value: val)=>boolean> = {
  required,
  email,
  phone,
};
export function inputValidation(value: val, validationParams:string[]): boolean | never {
  for (let i = 0; i < validationParams.length; i++) {
    const key = validationParams[i];
    const fn = validationMap[key];
    if (fn) {
      if (!fn(value)) return false;
    } else {
      throw new Error(`Для параметра валидации ${key} не определена функция`);
    }
  }
  return true;
}
