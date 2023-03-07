import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  setDoc,
  where,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../config/firebase";

const usersRef = collection(database, "users");
const classRef = collection(database, "class");
const studentRef = collection(database, "student");

export async function checkUser(uid: string) {
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const l = querySnapshot.empty;
  return l;
}

export async function getUser(uid: string) {
  const docRef = doc(database, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getUsers() {
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  const user: any[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    user.push(doc.data());
  });
  return user;
}

export async function updateUser(uid: string, data: any) {
  const userRef = doc(database, "users", uid);
  await updateDoc(userRef, data);
}

export async function createUser(uid: string, data: any) {
  return await setDoc(doc(database, "users", uid), data, { merge: true });
}

export async function createClass(data: {
  name: string;
  division?: string;
  createdBy: string;
}) {
  return await addDoc(collection(database, "class"), data);
}

export async function getClassesById(uid: string) {
  const q = query(classRef, where("createdBy", "==", uid));
  const querySnapshot = await getDocs(q);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    d.id = doc.id;
    data.push(d);
  });
  return data;
}

export async function getClassDataById(classId: string) {
  const docRef = doc(database, "class", classId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.id = docSnap.id;
    return data;
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function deleteClassById(classId: string) {
  return await deleteDoc(doc(database, "class", classId));
}

export async function createStudent(data: {
  name: string;
  parentEmail: string;
  createdBy: string;
  classId: string;
  isVerified: boolean;
}) {
  return await addDoc(collection(database, "student"), data);
}

export async function getStudentsById(uid: string) {
  const q = query(studentRef, where("createdBy", "==", uid));
  const querySnapshot = await getDocs(q);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    d.id = doc.id;
    data.push(d);
  });
  return data;
}

export async function deleteStudentById(studentId: string) {
  return await deleteDoc(doc(database, "student", studentId));
}

export async function getStudentById(uid: string) {
  const docRef = doc(database, "student", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.id = docSnap.id;
    return data;
  } else {
    console.log("No such document!");
    return null;
  }
}
export async function updateStudentById(uid: string, data: any) {
  const ref = doc(database, "student", uid);
  await updateDoc(ref, data);
}
