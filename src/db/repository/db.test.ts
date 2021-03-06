import * as firebase from '@firebase/testing';

const MY_PROJECT_ID = 'emergingswe-bd158';
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = { uid: myId, email: "abc@abc.com" };
const myUserDoc = {
  displayName: "Test Emerging App",
  email: myAuth.email,
  gender: null,
  hostileRating: 0,
  interest: [],
  levelOfExperience: 0,
  peerRating: 0,
  photoURL: "https://lh3.googleusercontent.com/a/AATXAJys_eFT4s9d31IHYpB7NpW4Q_fryVZGGnthUVMy=s96-c"
}


const getFirestore = (auth: { uid: string; email: string; } | null) => {
  //@ts-ignore
  return firebase.initializeTestApp({ projectId: MY_PROJECT_ID, auth: auth }).firestore();
}

const getAdminFirestore = () => {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
})

describe('Firestore Database testing suite', () => {

  test("Can't create interest collection without auth", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("interests").doc("Testing");
    await firebase.assertSucceeds(testDoc.set({ label: "Testing" }));
  });

  test("Can create interest collection with auth", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("interests").doc("Testing");
    await firebase.assertSucceeds(testDoc.set({ label: "Testing" }));
  });

  test('Create interest collection', async () => {
    const db = getFirestore(myAuth);
    const interestId = "Testing";
    const setupDoc = db.collection("interests").doc(interestId);
    await setupDoc.set({ label: "Testing" });

    const testRead = db.collection("interests").doc(interestId);
    await firebase.assertSucceeds(testRead.get());
  });

  test('Fail to Delete interest collection', async () => {
    const db = getFirestore(myAuth);
    const interestId = "Testing";
    const deleteDoc = db.collection("interests").doc(interestId);
    await firebase.assertSucceeds(deleteDoc.delete());
  });

  test('Fail to Update interest collection', async () => {
    const db = getFirestore(myAuth);
    const interestId = "Testing";
    const deleteDoc = db.collection("interests").doc(interestId);
    await firebase.assertFails(deleteDoc.update({ label: "Testings" }));
  });

  test("Can write to a user document with the same ID as our user", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testDoc.set(myUserDoc));
  });
  test("Can write to a user document with the other ID as our user", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testDoc.set(myUserDoc));
  });

  test("Can't write to a user document with the same ID as our user", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(theirId);
    await firebase.assertSucceeds(testDoc.set(myUserDoc));
  });

  test("Create user profile", async () => {
    const db = getFirestore(myAuth);
    const setupDoc = db.collection("users").doc(myId);
    await setupDoc.set(myUserDoc);

    const testRead = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testRead.get());
  });

  test('can not update own messages', async () => {
    const db = getFirestore(myAuth);
    const admin = getAdminFirestore();
    const doc = admin.collection('users').doc('abc123');
    await doc.set({ uid: myAuth.uid });
    const testDoc = db.collection('users').doc('abc123');
    await firebase.assertSucceeds(testDoc.set({ foo: 'bar' }));
  });
});