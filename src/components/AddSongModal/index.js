import React, { useState } from "react";
import { Modal, Button } from "react-materialize";
import API from "../../utils/API";
import "./style.css";

export default function AddSongModal({
  setLoading,
  loading,
  setMessage,
  userData,
  createNewSession,
  searchTitle,
}) {
  const trigger = <Button className="btn_purple">can't find your song?</Button>;
  const [inputs, setInputs] = useState({ title: searchTitle });

  // control form inputs for search
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // control form submit for search
  // activate loading visual to await api response
  const handleInputSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, search: true });
    setMessage("Searching. . .");

    // send title and artist search as one string with the key of name
    let data = { name: inputs.title };
    API.searchNewSong(data)
      .then((data) => {
        const newSessionObj = { host: userData.id, karaokeSong: data.data };
        createNewSession(newSessionObj);

        setLoading(false);
        setInputs({ title: "" });
      })
      .catch(() => {
        setInputs({ title: "" });
        setMessage("Song is not available yet, please try another song");
        setLoading(false);
      });
  };

  return (
    <Modal
      className="center-align"
      header="Maybe we can find it!"
      trigger={trigger}
    >
      <form>
        <div className="form-group left-align">
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
          <label htmlFor="title">title / artist</label>
        </div>

        {inputs.title ? (
          <Button
            onClick={handleInputSubmit}
            className="login__btn btn_purple"
            type="submit"
            modal="close"
          >
            Search
          </Button>
        ) : (
          <Button disabled>...</Button>
        )}
      </form>
    </Modal>
  );
}
