import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  // Define la configuración de Firebase
  private firebaseConfig = {
    apiKey: "AIzaSyDksS2UIlb2vY_N_mSbZGxQ-pvccjeBsfs",
    authDomain: "imagenes-proyecto-ea2d4.firebaseapp.com",
    projectId: "imagenes-proyecto-ea2d4",
    storageBucket: "imagenes-proyecto-ea2d4.appspot.com",
    messagingSenderId: "130672253234",
    appId: "1:130672253234:web:0bbabcad2be8cd3e785f2b",
    measurementId: "G-HTT64BQQHM"
  };

  // Inicializa Firebase
  private app = initializeApp(this.firebaseConfig);
  private storage = getStorage(this.app);

  constructor() { }

  // Función para subir un archivo
  async uploadFile(name: string, file: any): Promise<string> {
    const storageRef = ref(this.storage, name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}
