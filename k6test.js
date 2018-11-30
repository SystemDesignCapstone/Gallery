import http from 'k6/http';
let i = 1;
export default function() {
  http.get(`http://ec2-18-218-112-50.us-east-2.compute.amazonaws.com/listings/${i++}`);
}
