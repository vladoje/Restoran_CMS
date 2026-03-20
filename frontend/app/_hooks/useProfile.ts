"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { User } from "../_components/RegisterHelpers";

export function useProfile() {
  function handleLogout() {
    // Brišemo sve kolačiće
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name =
        eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });

    // Preusmjeravamo korisnika na login
  }

  function handleDelete() {
    fetch("https://projekat-testovi.onrender.com/user/delete-user", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        toast.success("Uspješno ste obrisali vaš nalog");
        handleLogout();
      })
      .catch((err) => {
        toast.error("Došlo je do greške prilikom brisanja naloga");
        console.error(err);
      });
  }
  function handleClick() {
    if (!username) {
      toast.error("Ne mozete iamti prazan username");
      setUsername(user.name);
      return;
    }

    fetch("https://projekat-testovi.onrender.com/user/update-user", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then(() => toast.success("Uspjesno ste promijenili licne podatke"))
      .catch((err) => {
        toast.error("Došlo je do greške prilikom mijenjanja licnih podataka");
        console.error(err);
      });
  }
  //useUser.getState().user ||
  const user: User = {
    userId: 0,
    name: "",
    email: "",
    passwordHash: "",
    role: "user",
  };
  const [username, setUsername] = useState(user.name);

  return {
    username,
    setUsername,
    user,
    handleClick,
    handleDelete,
    handleLogout,
  };
}
