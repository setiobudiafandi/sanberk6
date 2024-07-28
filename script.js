import http from 'k6/http'
import {sleep} from 'k6'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { check, group } from 'k6'

// export default function() {
//     http.get('https://test.k6.io/')
//     sleep(1)
// }

export default function () {
    const url = 'https://reqres.in/api/users';
    const payload = JSON.stringify(
        {
            "name": "morpheus " + randomIntBetween(1,100),
            "job": "leader " + randomIntBetween(1,100)
        }
    );
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    let response = http.post(url, payload, params);
    sleep(1)

    check(response, {
        'is status 201': (r) => r.status === 201,
    });

    console.log(JSON.stringify(payload))


    try {
        const jsonResponse = response.json();
        console.log('Parsed JSON Response:', JSON.stringify(jsonResponse));
    } catch (e) {
        console.error('Failed to parse JSON:', e);
    }
  }