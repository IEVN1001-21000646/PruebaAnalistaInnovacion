import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import VideoSearch from "./BuscarVideo";
import FavoritesList from "./Favoritos";

export default function Inicio() {

  const [update, setUpdate] = useState(0);

  const handleAddFavorite = () => {
    setUpdate((prev) => prev + 1);
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      {userData && <h2>Bienvenido, {userData.username}</h2>}
      <Navbar username={userData?.username} />
      <VideoSearch onAddFavorite={handleAddFavorite}/>
      <FavoritesList update={update} />
    </div>
  );
}
