import http from 'k6/http';
let i = 9000000;
export default function() {
  http.get(`http://127.0.0.1:3006/listings/${i++}.json`);
}
