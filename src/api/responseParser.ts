async function responseParser(responce: Response):Promise<Record<string, string|number>> {
  let body;
  try {
    body = await responce.json();
  } catch (e) {
    body = '';
  }
  if (responce.status === 200) {
    return body;
  }
  let errorMessage = responce.statusText;
  if (body && body.reason) errorMessage = body.reason;
  throw new Error(errorMessage);
}
export default responseParser;
