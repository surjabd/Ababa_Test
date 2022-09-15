

export const getAllMovies = async (options: {}) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },

  };

  var url = new URL("http://localhost:3000/movie");
  Object.keys(options).forEach(key => url.searchParams.append(key, options[key as keyof typeof options]));
  
  const response = await fetch(url.href,requestOptions)
  const data = await response.json()
  return data
}

export const saveMovie = async (options: {}) => {
  console.log(options)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  };

  var url = new URL("http://localhost:3000/movie");
  console.log(url,requestOptions)
  const response = await fetch(url.href,requestOptions)
  const data = await response.json()
  return data
}

