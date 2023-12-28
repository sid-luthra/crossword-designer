import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase.config";
import { useCallback, useEffect, useState } from "react";

export default function useFirestore() {
  const [loading, setLoading] = useState<boolean>(true);
  const [puzzleList, setPuzzleList] = useState<DocumentData[]>([]);

  const getPuzzleList = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "puzzles"));
    const puzzles = querySnapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      return { id, ...data };
    });
    setPuzzleList(puzzles);
  }, [setPuzzleList]);

  const addPuzzle = async (puzzle: DocumentData) => {
    const docRef = await addDoc(collection(db, "puzzles"), puzzle);
    console.log("Document written with ID: ", docRef.id);
  };

  const getPuzzle = async (id: string) => {
    const docRef = await getDoc(doc(db, "puzzles", id));
    return docRef.data();
  };

  const updatePuzzle = async (id: string, puzzle: DocumentData) => {
    try {
      await updateDoc(doc(db, "puzzles", id), puzzle);
      const docRef = await getDoc(doc(db, "puzzles", id));
      console.log("Document data:", docRef.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPuzzleList();
    setLoading(false);
  }, [getPuzzleList]);

  return { loading, puzzleList, addPuzzle, getPuzzle, updatePuzzle };
}
