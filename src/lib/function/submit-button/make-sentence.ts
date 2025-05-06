import { Request } from "@/types/common";

// const mock = [
//   {
//     "id": 2,
//     "title": "물",
//     "amount": 1
//   },
//   {
//     "id": 1,
//     "title": "젓가락",
//     "amount": 1
//   }
// ]
// =>> "물 1, 젓가락 1"

export default function makeSentence(requestList: Request[]) {
  const sentence = requestList.map(generateRequestString).join(", ");

  function generateRequestString(request: Request) {
    return request.title + " " + request.amount;
  }

  return sentence;
}
