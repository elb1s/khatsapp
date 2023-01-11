import { collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc } from "firebase/firestore";
const style = {
  form: `h-14 w-full max-w-[728px] flex text-xl absolute  bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};
const SendMessage = (props) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Please type something!");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    props.scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        className={style.input}
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="Message"
      />
      <button className={style.button} type="submit">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
