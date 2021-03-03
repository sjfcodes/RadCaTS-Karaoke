import React, { useState, useEffect } from 'react';
import useAudioPlayer from '../components/AudioPlayer/useAudioPlayer';
import momentDurationFormatSetup from "moment-duration-format";
import { useParams, Redirect } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import Preloader from "../components/Preloader"
import { Button } from "react-materialize"
import Header from "../components/Header";
import API from "../utils/API";
import moment from "moment";
import "../App.css"

export default function Session({ userData, setUserData, sessionData, setSessionData }) {


    const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const handleFinish = () => { setPlaying(false) }
    const handleBack = () => { setPlaying(false) }

    const formatDuration = (duration) => {
        return moment
            .duration(duration, "seconds")
            .format("mm:ss", { trim: false });
    }

    useEffect(() => {
        API.startSession(id)
            .then(data => {
                // parse stringified lyrics to an object array.
                let x = data.data.karaokeSong
                console.log("x", x)
                // let parsed = JSON.parse(x.lyrics)
                let parsed = JSON.parse("[]")
                let lyricsArr = parsed.lines
                // build data object we need to start our session.
                let obj = {
                    artist: x.artist,
                    lyrics: lyricsArr,
                    mixed: x.mixed,
                    sessionId: id,
                    songId: x._id,
                    name: x.name
                }
                console.log("obj", obj)
                // save the obj data to sessionData
                setSessionData(obj)
                setTimeout(() => { setLoading(false) }, 5000)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    return (
        <>
            {
                !userData.isLoggedIn

                    ? <Redirect to="/" />

                    : loading

                        ? <>
                            <Header userData={userData} setUserData={setUserData} />
                            <Preloader />
                        </>

                        : <>
                            <Header userData={userData} setUserData={setUserData} />

                            <AudioPlayer

                                formatDuration={formatDuration}
                                sessionData={sessionData}
                                userData={userData}
                                duration={duration}
                                curTime={curTime}
                                playing={playing}

                            />
                        </>
            }

            <Button
                onClick={handleBack}
            >Back
            </Button>

            <Button
                onClick={handleFinish}
            >Finish
            </Button>

        </>
    )
}
