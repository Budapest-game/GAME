import { BASE_API_URL } from '../constants';
import Theme from './theme';

interface MockFetchData {
  status: number;
  statusText: string;
  body: string;
}

function mockFetch(data: MockFetchData) {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve({
      status: data.status,
      statusText: data.statusText,
      json: () => { return Promise.resolve(JSON.parse(data.body)); },
    });
  });
}

afterEach(() => {
  jest.clearAllMocks();
});

test('Получение темы', async () => {
  global.fetch = mockFetch({
    status: 200,
    statusText: 'Ok',
    body: JSON.stringify({ id: 'red', theme: '* { color: green; }' }),
  });

  await Theme.get('red');

  expect(fetch).toHaveBeenCalledWith('/theme/red', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
  });
});

test('Неудачная попытка получения темы', async () => {
  global.fetch = mockFetch({ status: 500, statusText: 'Server error', body: '' });

  await expect(Theme.get(' ')).rejects.toThrow('Server error');

  expect(fetch).toHaveBeenCalledWith('/theme/ ', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
  });
});
