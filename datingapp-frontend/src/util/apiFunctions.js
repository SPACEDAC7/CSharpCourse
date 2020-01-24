const host = 'https://localhost:44356/';

export function getValues() {
    console.log('we are going to call');
    var url = host + 'api/values';
    fetch(
        url,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => {
          console.log(res);
          return res.status === 200 ? res.json(): {}})
        .then(values => {
          console.log(values)
        });
  }