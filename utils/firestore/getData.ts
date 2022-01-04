// import { collection, getDocs, query } from 'firebase/firestore';
// import db from '~/plugins/firebase';

// // get処理
// export default async function () {
//   const docRef = query(collection(db, 'tasks'));
//   const querySnapshot = await getDocs(docRef);
//   const data: any[] = [];
//   querySnapshot.forEach((doc) => {
//     data.push(doc.data());
//   });

//   return data;
// }
